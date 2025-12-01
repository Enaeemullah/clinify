import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { QueueEntry } from './entities/queue-entry.entity';

@WebSocketGateway({ namespace: '/queue', cors: { origin: '*' } })
export class QueueGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    // eslint-disable-next-line no-console
    console.log(`Queue client connected ${client.id}`);
  }

  broadcastUpdate(doctorId: string, entries: QueueEntry[]) {
    this.server.emit('queue.update', { doctorId, entries });
  }

  emitNext(doctorId: string, entry: QueueEntry) {
    this.server.emit('queue.next', { doctorId, entry });
  }

  emitSkip(doctorId: string, entry: QueueEntry) {
    this.server.emit('queue.skip', { doctorId, entry });
  }
}
