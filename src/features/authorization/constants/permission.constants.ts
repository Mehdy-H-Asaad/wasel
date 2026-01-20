import {
  PERMISSION_ACTION,
  PERMISSION_RESOURCE,
} from "../schema/permission.schema";

export const PERMISSIONS_QUERY_KEY = "permissions";
export const USER_PERMISSIONS_QUERY_KEY = "user-permissions";

export const PERMISSION_ACTIONS = [
  { value: PERMISSION_ACTION.CREATE, label: "Create" },
  { value: PERMISSION_ACTION.READ, label: "Read" },
  { value: PERMISSION_ACTION.UPDATE, label: "Update" },
  { value: PERMISSION_ACTION.DELETE, label: "Delete" },
  { value: PERMISSION_ACTION.MANAGE, label: "Manage (Full Access)" },
] as const;

export const PERMISSION_RESOURCES = [
  { value: PERMISSION_RESOURCE.INVOICE, label: "Invoices" },
  { value: PERMISSION_RESOURCE.QUOTATION, label: "Quotations" },
  { value: PERMISSION_RESOURCE.PURCHASE, label: "Purchases" },
  { value: PERMISSION_RESOURCE.CLIENT, label: "Clients" },
  { value: PERMISSION_RESOURCE.SUPPLIER, label: "Suppliers" },
  { value: PERMISSION_RESOURCE.STOCK, label: "Stock/Inventory" },
  { value: PERMISSION_RESOURCE.BRANCH, label: "Branches" },
  { value: PERMISSION_RESOURCE.USER, label: "Users" },
  { value: PERMISSION_RESOURCE.PROJECT, label: "Projects" },
  { value: PERMISSION_RESOURCE.POINT_OF_SALE, label: "Point of Sale" },
  { value: PERMISSION_RESOURCE.REPORT, label: "Reports" },
  { value: PERMISSION_RESOURCE.SETTINGS, label: "Settings" },
] as const;

/**
 * Default permission sets for different roles
 */
export const DEFAULT_ROLE_PERMISSIONS = {
  SUPER_ADMIN: [
    "invoice:manage",
    "quotation:manage",
    "purchase:manage",
    "client:manage",
    "supplier:manage",
    "stock:manage",
    "branch:manage",
    "user:manage",
    "project:manage",
    "point_of_sale:manage",
    "report:manage",
    "settings:manage",
  ],
  ADMIN: [
    "invoice:manage",
    "quotation:manage",
    "purchase:manage",
    "client:manage",
    "supplier:manage",
    "stock:manage",
    "project:manage",
    "point_of_sale:manage",
    "report:read",
    "user:read",
  ],
  ACCOUNTANT: [
    "invoice:manage",
    "quotation:read",
    "purchase:manage",
    "client:read",
    "supplier:read",
    "report:read",
  ],
  SALESMAN: [
    "invoice:create",
    "invoice:read",
    "quotation:manage",
    "client:read",
    "client:create",
    "point_of_sale:manage",
    "project:read",
  ],
} as const;
