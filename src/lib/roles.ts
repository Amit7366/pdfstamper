export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  USER: "user",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  user: "User",
};

export const ALL_ROLES_FOR_SELECT: Role[] = [
  ROLES.USER,
  ROLES.ADMIN,
  ROLES.SUPER_ADMIN,
];

export const ROLE_LEVELS: Record<Role, number> = {
  user: 1,
  admin: 2,
  super_admin: 3,
};

export function hasMinRole(userRole: Role, minRole: Role) {
  return ROLE_LEVELS[userRole] >= ROLE_LEVELS[minRole];
}
