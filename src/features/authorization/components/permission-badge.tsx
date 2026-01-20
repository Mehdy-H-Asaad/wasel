"use client";

import { Badge } from "@/components/ui/badge";
import { parsePermissionString } from "../schema/permission.schema";
import { cn } from "@/lib/utils";

type TPermissionBadgeProps = {
  permission: string;
  className?: string;
};

const actionColors = {
  create: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  read: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  update: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  delete: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
  manage: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
};

export const PermissionBadge = ({
  permission,
  className,
}: TPermissionBadgeProps) => {
  const parsed = parsePermissionString(permission);

  if (!parsed) {
    return (
      <Badge variant="outline" className={className}>
        {permission}
      </Badge>
    );
  }

  const actionColor =
    actionColors[parsed.action as keyof typeof actionColors] ||
    "bg-gray-500/10 text-gray-700";

  return (
    <Badge
      variant="outline"
      className={cn("font-mono text-xs", actionColor, className)}
    >
      {parsed.resource}:{parsed.action}
    </Badge>
  );
};
