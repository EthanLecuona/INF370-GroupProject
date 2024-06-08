import { RolePermission } from "./role-permission";

export interface UserPermission {
    userPermissionsId: number;
    description: string;
    rolePermission: RolePermission;
}