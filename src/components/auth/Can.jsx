import React from 'react';
import { usePermissions } from '../../hooks/usePermissions';

export function Can({ do: permission, children, fallback = null }) {
  const { can } = usePermissions();

  if (can(permission)) {
    return <>{children}</>;
  }

  return fallback;
}

