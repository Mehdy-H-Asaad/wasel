import { useGetUserPermissions } from "./use-get-user-permissions";
import {
  PERMISSION_ACTION,
  PERMISSION_RESOURCE,
  createPermissionString,
} from "../schema/permission.schema";

type TUseCheckPermissionOptions = {
  userId: number | string;
  enabled?: boolean;
};

/**
 * Hook to check if a user has specific permissions
 * Useful for conditional rendering and access control
 */
export const useCheckPermission = ({
  userId,
  enabled = true,
}: TUseCheckPermissionOptions) => {
  const { userPermissions, isLoadingUserPermissions } = useGetUserPermissions({
    userId,
    enabled,
  });

  /**
   * Check if user has a specific permission
   * @param resource - The resource to check
   * @param action - The action to check
   * @returns true if user has the permission
   */
  const hasPermission = (
    resource: PERMISSION_RESOURCE | string,
    action: PERMISSION_ACTION | string
  ): boolean => {
    if (!userPermissions?.permissions) return false;

    const permissionString = createPermissionString(resource, action);
    const hasExactPermission =
      userPermissions.permissions.includes(permissionString);

    // Also check for "manage" permission which grants all actions
    const managePermission = createPermissionString(
      resource,
      PERMISSION_ACTION.MANAGE
    );
    const hasManagePermission =
      userPermissions.permissions.includes(managePermission);

    return hasExactPermission || hasManagePermission;
  };

  /**
   * Check if user has any of the specified permissions
   * @param permissions - Array of [resource, action] tuples
   * @returns true if user has at least one of the permissions
   */
  const hasAnyPermission = (
    permissions: Array<[PERMISSION_RESOURCE | string, PERMISSION_ACTION | string]>
  ): boolean => {
    return permissions.some(([resource, action]) =>
      hasPermission(resource, action)
    );
  };

  /**
   * Check if user has all of the specified permissions
   * @param permissions - Array of [resource, action] tuples
   * @returns true if user has all of the permissions
   */
  const hasAllPermissions = (
    permissions: Array<[PERMISSION_RESOURCE | string, PERMISSION_ACTION | string]>
  ): boolean => {
    return permissions.every(([resource, action]) =>
      hasPermission(resource, action)
    );
  };

  /**
   * Check if user has manage permission for a resource
   * @param resource - The resource to check
   * @returns true if user has manage permission
   */
  const canManage = (resource: PERMISSION_RESOURCE | string): boolean => {
    return hasPermission(resource, PERMISSION_ACTION.MANAGE);
  };

  return {
    permissions: userPermissions?.permissions || [],
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canManage,
    isLoadingPermissions: isLoadingUserPermissions,
  };
};
