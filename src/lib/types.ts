import type { Role } from "./roles";

export type ApiUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  details?: unknown;
};
