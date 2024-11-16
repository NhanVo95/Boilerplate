type Role = keyof typeof ROLES
type Permission = (typeof ROLES)[Role][number]

const ROLES = {
  admin: ['read', 'write', 'update', 'delete'],
  moderator: ['read', 'write'],
  user: ['read']
} as const

export const checkPermission = (
  user: { id: string; role: Role },
  permission: Permission
): boolean => {
  return (ROLES[user.role] as readonly Permission[]).includes(permission)
}
