"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TProjectDTO, ProjectStatus } from "../../schema/project.schema";
import { ProjectActionsCell } from "./actions/project-actions-cell";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "date-fns";
import { FormatRiyal } from "@/components/common/format-riyal";

export const ProjectColumns: ColumnDef<TProjectDTO>[] = [
  {
    accessorKey: "name",
    header: "Project Name",
  },
  {
    accessorKey: "customer",
    header: "Client",
    cell: ({ row }) => {
      return row.original.customer?.registration_name || "N/A";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusBadgeColor =
        status === ProjectStatus.ACTIVE
          ? "bg-blue-50 border-blue-500 text-blue-500 dark:bg-blue-900 dark:border-blue-900 dark:text-blue-500"
          : status === ProjectStatus.DRAFT
            ? "bg-orange-50 border-orange-500 text-orange-500 dark:bg-orange-900 dark:border-orange-900 dark:text-orange-500"
            : status === ProjectStatus.ON_HOLD
              ? "bg-yellow-50 border-yellow-500 text-yellow-500 dark:bg-yellow-900 dark:border-yellow-900 dark:text-yellow-500"
              : status === ProjectStatus.COMPLETED
                ? "bg-green-50 border-green-500 text-green-500 dark:bg-green-900 dark:border-green-900 dark:text-green-500"
                : status === ProjectStatus.CANCELLED
                  ? "bg-red-50 border-red-500 text-red-500 dark:bg-red-900 dark:border-red-900 dark:text-red-500"
                  : "bg-secondary border-secondary text-secondary dark:bg-secondary-900 dark:border-secondary-900 dark:text-secondary";
      return (
        <Badge className={statusBadgeColor}>
          {status.split("_").join(" ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => {
      return row.original.start_date
        ? formatDate(new Date(row.original.start_date), "yyyy-MM-dd")
        : "N/A";
    },
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => {
      return row.original.end_date
        ? formatDate(new Date(row.original.end_date), "yyyy-MM-dd")
        : "N/A";
    },
  },
  {
    accessorKey: "budget_amount",
    header: "Budget",
    cell: ({ row }) => {
      return row.original.budget_amount
        ? <FormatRiyal value={row.original.budget_amount} />
        : "N/A";
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return row.original.description || "-";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <ProjectActionsCell row={row} />;
    },
  },
];
