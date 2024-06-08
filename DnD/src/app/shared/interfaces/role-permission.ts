import { UserRole } from "./user-role";
import { UserPermission } from "./user-permission";

export interface RolePermission {
    rolePermissionId: number;
    userRoleId: number;
    userPermissionsId: number;
    rolePermission1: UserRole;
    rolePermissionNavigation: UserPermission;
}