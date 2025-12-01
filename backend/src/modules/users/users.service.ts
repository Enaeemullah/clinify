import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const password = await argon2.hash(dto.password);
    const entity = this.userRepository.create({ ...dto, password });
    return this.userRepository.save(entity);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async assignRoles(userId: string, roleIds: string[]): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['roles'] });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const roles = roleIds.length ? await this.roleRepository.findBy({ id: In(roleIds) }) : [];
    user.roles = roles;
    return this.userRepository.save(user);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email }, relations: ['roles', 'roles.permissions'] });
  }

  findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getUserWithPermissions(userId: string): Promise<{ id: string; permissions: string[] }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'roles.permissions'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const permissions = user.roles
      ?.flatMap(role => role.permissions ?? [])
      .map(permission => permission.code)
      .filter(Boolean);

    return { id: user.id, permissions: Array.from(new Set(permissions)) };
  }
}
