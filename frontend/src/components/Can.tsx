import { PropsWithChildren } from 'react';
import { usePermissions } from '@/hooks/usePermissions';

interface CanProps extends PropsWithChildren {
  permission: string;
  fallback?: React.ReactNode;
}

export function Can({ permission, children, fallback = null }: CanProps) {
  const permissions = usePermissions();
  if (!permissions.has(permission)) {
    return fallback;
  }
  return <>{children}</>;
}
