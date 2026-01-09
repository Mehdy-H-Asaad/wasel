"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  BranchStatus,
  TaxIntegrationStatus,
  TBranchDTO,
} from "../../schema/branch.schema";
import { BranchActionsCell } from "./actions/branch-actions-cell";
import { Badge } from "@/components/ui/badge";

export const BranchColumns: ColumnDef<TBranchDTO>[] = [
  {
    accessorKey: "name",
    header: "Branch Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusBadgeColor =
        status === BranchStatus.COMPLETED
          ? "bg-green-50 border-green-500 text-green-500 dark:bg-green-900 dark:border-green-900 dark:text-green-500"
          : status === BranchStatus.PENDING
          ? "bg-yellow-50 border-yellow-500 text-yellow-500 dark:bg-yellow-900 dark:border-yellow-900 dark:text-yellow-500"
          : status === BranchStatus.DELETED
          ? "bg-red-50 border-red-500 text-red-500 dark:bg-red-900 dark:border-red-900 dark:text-red-500"
          : "bg-secondary border-secondary text-secondary dark:bg-secondary-900 dark:border-secondary-900 dark:text-secondary";
      return (
        <Badge className={statusBadgeColor}>
          {row.original.status.split("_").join(" ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "tax_integration_status",
    header: "Tax Integration Status",
    cell: ({ row }) => {
      const taxIntegrationStatus = row.original.tax_integration_status;
      const taxIntegrationStatusBadgeColor =
        taxIntegrationStatus === TaxIntegrationStatus.COMPLETED
          ? "bg-green-50 border-green-500 text-green-500 dark:bg-green-900 dark:border-green-900 dark:text-green-500"
          : taxIntegrationStatus === TaxIntegrationStatus.NOT_STARTED
          ? "bg-yellow-50 border-yellow-500 text-yellow-500 dark:bg-yellow-900 dark:border-yellow-900 dark:text-yellow-500"
          : taxIntegrationStatus === TaxIntegrationStatus.PENDING_OTP
          ? "bg-blue-50 border-blue-500 text-blue-500 dark:bg-blue-900 dark:border-blue-900 dark:text-blue-500"
          : "bg-secondary border-secondary text-secondary dark:bg-secondary-900 dark:border-secondary-900 dark:text-secondary";
      return (
        <Badge className={taxIntegrationStatusBadgeColor}>
          {taxIntegrationStatus.split("_").join(" ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "street",
    header: "Street",
  },
  {
    accessorKey: "building_number",
    header: "Building No.",
  },
  {
    accessorKey: "division",
    header: "District",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "postal_code",
    header: "Postal Code",
  },
  {
    accessorKey: "address",
    header: "Address",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <BranchActionsCell row={row} />;
    },
  },
];
