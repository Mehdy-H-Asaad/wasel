import z from "zod";

/**
 * Permission actions that can be performed on resources
 */
export enum PERMISSION_ACTION {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
  MANAGE = "manage", // Full access
}

/**
 * Resources/Modules that can have permissions
 */
export enum PERMISSION_RESOURCE {
  INVOICE = "invoice",
  QUOTATION = "quotation",
  PURCHASE = "purchase",
  CLIENT = "client",
  SUPPLIER = "supplier",
  STOCK = "stock",
  BRANCH = "branches",
  USER = "user",
  PROJECT = "project",
  POINT_OF_SALE = "point_of_sale",
  REPORT = "report",
  SETTINGS = "settings",
}

/**
 * Schema for a single permission string (e.g., "invoice:read", "user:create")
 */
export const PermissionStringSchema = z
  .string()
  .regex(
    /^[a-z_]+:(create|read|update|delete|manage)$/,
    "Permission must be in format 'resource:action'"
  );

/**
 * Schema for a single permission object
 */
export const PermissionSchema = z.object({
  id: z.number().optional(),
  resource: z.nativeEnum(PERMISSION_RESOURCE),
  action: z.nativeEnum(PERMISSION_ACTION),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type TPermission = z.infer<typeof PermissionSchema>;

/**
 * Schema for all permissions response
 */
export const AllPermissionsSchema = z.array(PermissionSchema);

export type TAllPermissions = z.infer<typeof AllPermissionsSchema>;

/**
 * Schema for user permissions (list of permission strings)
 */
export const UserPermissionsSchema = z.object({
  user_id: z.number(),
  permissions: z.array(z.string()),
  updated_at: z.string().optional(),
});

export type TUserPermissions = z.infer<typeof UserPermissionsSchema>;

/**
 * Schema for updating user permissions (PUT request body)
 */
export const UpdateUserPermissionsSchema = z.object({
  permissions: z.array(z.string()).min(0, "Permissions array is required"),
});

export type TUpdateUserPermissions = z.infer<
  typeof UpdateUserPermissionsSchema
>;

/**
 * Helper type for permission map (grouped by resource)
 */
export type TPermissionMap = {
  [key in PERMISSION_RESOURCE]?: PERMISSION_ACTION[];
};

/**
 * Helper function to convert permission strings to objects
 */
export const parsePermissionString = (
  permission: string
): { resource: string; action: string } | null => {
  const parts = permission.split(":");
  if (parts.length === 2) {
    return {
      resource: parts[0],
      action: parts[1],
    };
  }
  return null;
};

/**
 * Helper function to create permission string from resource and action
 */
export const createPermissionString = (
  resource: PERMISSION_RESOURCE | string,
  action: PERMISSION_ACTION | string
): string => {
  return `${resource}:${action}`;
};

/**
 * Helper function to group permissions by resource
 */
export const groupPermissionsByResource = (
  permissions: string[]
): TPermissionMap => {
  const grouped: TPermissionMap = {};

  permissions.forEach((permission) => {
    const parsed = parsePermissionString(permission);
    if (parsed) {
      const resource = parsed.resource as PERMISSION_RESOURCE;
      const action = parsed.action as PERMISSION_ACTION;

      if (!grouped[resource]) {
        grouped[resource] = [];
      }
      grouped[resource]!.push(action);
    }
  });

  return grouped;
};
