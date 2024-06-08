import { Login } from "./login";
import { RolePermission } from "./role-permission";

export interface UserRole {
    userRoleId: number;
    description: string;
    userRoleType: string;
    login: Login;
    rolePermission: RolePermission;
}