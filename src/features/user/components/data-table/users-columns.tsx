"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TUserDTO, USER_STATUS } from "../../schema/user.schema";
import { UsersActionCell } from "./actions/users-action-cell";
import { Badge } from "@/components/ui/badge";
import { USER_ROLES } from "../../constants/user.constants";

export const UsersColumns: ColumnDef<TUserDTO>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;

      const roleBadgeColor =
        USER_ROLES[role] === USER_ROLES.SUPER_ADMIN
          ? "bg-green-50 border-green-500 text-green-500 dark:bg-green-900 dark:border-green-900 dark:text-green-500"
          : USER_ROLES[role] === USER_ROLES.ADMIN
          ? "bg-blue-50 border-blue-500 text-blue-500 dark:bg-blue-900 dark:border-blue-900 dark:text-blue-500"
          : USER_ROLES[role] === USER_ROLES.SALESMAN
          ? "bg-orange-50 border-orange-500 text-orange-500 dark:bg-orange-900 dark:border-orange-900 dark:text-orange-500"
          : USER_ROLES[role] === USER_ROLES.ACCOUNTANT
          ? "bg-red-50 border-red-500 text-red-500 dark:bg-red-900 dark:border-red-900 dark:text-red-500"
          : "bg-secondary border-secondary text-secondary dark:bg-secondary-900 dark:border-secondary-900 dark:text-secondary";

      return (
        <Badge className={`${roleBadgeColor} capitalize`}>
          {role.split("_").join(" ").toLowerCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      // const isCompleted = row.original.is_completed;

      const statusBadgeColor =
        USER_STATUS[status] === USER_STATUS.ACTIVE
          ? "bg-green-50 border-green-500 text-green-500 dark:bg-green-900 dark:border-green-900 dark:text-green-500"
          : USER_STATUS[status] === USER_STATUS.PENDING
          ? "bg-yellow-50 border-yellow-500 text-yellow-500 dark:bg-yellow-900 dark:border-yellow-900 dark:text-yellow-500"
          : USER_STATUS[status] === USER_STATUS.BLOCKED
          ? "bg-blue-50 border-blue-500 text-blue-500 dark:bg-blue-900 dark:border-blue-900 dark:text-blue-500"
          : USER_STATUS[status] === USER_STATUS.DISABLED
          ? "bg-orange-50 border-orange-500 text-orange-500 dark:bg-orange-900 dark:border-orange-900 dark:text-orange-500"
          : USER_STATUS[status] === USER_STATUS.DELETED
          ? "bg-red-50 border-red-500 text-red-500 dark:bg-red-900 dark:border-red-900 dark:text-red-500"
          : "bg-secondary border-secondary text-secondary dark:bg-secondary-900 dark:border-secondary-900 dark:text-secondary";

      return <Badge className={statusBadgeColor}>{status}</Badge>;
    },
  },
  {
    accessorKey: "organization",
    header: "Organization",
    cell: ({ row }) => {
      const organization = row.original.organization;
      return organization ? organization.name : "None";
    },
  },
  {
    accessorKey: "branch",
    header: "Branch",
    cell: ({ row }) => {
      const branch = row.original.branch;
      return branch ? branch.name : "None";
    },
  },
  {
    accessorKey: "last_login",
    header: "Last Login",
    cell: ({ row }) => {
      const lastLogin = row.original.last_login;
      return lastLogin ? new Date(lastLogin).toLocaleDateString() : "Never";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <UsersActionCell row={row} />;
    },
  },
];
