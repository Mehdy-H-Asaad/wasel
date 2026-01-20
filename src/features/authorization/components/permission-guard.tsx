"use client";

import { ReactNode } from "react";
import { useCheckPermission } from "../hooks/use-check-permission";
import {
  PERMISSION_ACTION,
  PERMISSION_RESOURCE,
} from "../schema/permission.schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

type TPermissionGuardProps = {
  userId: number | string;
  resource: PERMISSION_RESOURCE | string;
  action: PERMISSION_ACTION | string;
  children: ReactNode;
  fallback?: ReactNode;
  showError?: boolean;
};

/**
 * Component to conditionally render children based on user permissions
 * @example
 * <PermissionGuard userId={userId} resource="invoice" action="create">
 *   <CreateInvoiceButton />
 * </PermissionGuard>
 */
export const PermissionGuard = ({
  userId,
  resource,
  action,
  children,
  fallback,
  showError = false,
}: TPermissionGuardProps) => {
  const { hasPermission, isLoadingPermissions } = useCheckPermission({
    userId,
  });

  if (isLoadingPermissions) {
    return fallback || null;
  }

  if (!hasPermission(resource, action)) {
    if (showError) {
      return (
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Permission Denied</AlertTitle>
          <AlertDescription>
            You don&apos;t have permission to access this feature.
          </AlertDescription>
        </Alert>
      );
    }
    return fallback || null;
  }

  return <>{children}</>;
};

type TMultiPermissionGuardProps = {
  userId: number | string;
  permissions: Array<[PERMISSION_RESOURCE | string, PERMISSION_ACTION | string]>;
  mode?: "any" | "all";
  children: ReactNode;
  fallback?: ReactNode;
  showError?: boolean;
};

/**
 * Component to conditionally render children based on multiple user permissions
 * @example
 * <MultiPermissionGuard
 *   userId={userId}
 *   permissions={[["invoice", "read"], ["invoice", "create"]]}
 *   mode="any"
 * >
 *   <InvoiceSection />
 * </MultiPermissionGuard>
 */
export const MultiPermissionGuard = ({
  userId,
  permissions,
  mode = "any",
  children,
  fallback,
  showError = false,
}: TMultiPermissionGuardProps) => {
  const { hasAnyPermission, hasAllPermissions, isLoadingPermissions } =
    useCheckPermission({
      userId,
    });

  if (isLoadingPermissions) {
    return fallback || null;
  }

  const hasAccess =
    mode === "any"
      ? hasAnyPermission(permissions)
      : hasAllPermissions(permissions);

  if (!hasAccess) {
    if (showError) {
      return (
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Permission Denied</AlertTitle>
          <AlertDescription>
            You don&apos;t have the required permissions to access this feature.
          </AlertDescription>
        </Alert>
      );
    }
    return fallback || null;
  }

  return <>{children}</>;
};
