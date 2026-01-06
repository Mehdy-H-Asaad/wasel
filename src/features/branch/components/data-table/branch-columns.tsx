"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TBranchDTO } from "../../schema/branch.schema";
// import { ClientActionsCell } from "./actions/ClientActionsCell";

export const BranchColumns: ColumnDef<TBranchDTO>[] = [
  {
    accessorKey: "name",
    header: "Branch Name",
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

  //   {
  //     id: "actions",
  //     header: "Actions",
  //     cell: ({ row }) => {
  //       return <ClientActionsCell row={row} />;
  //     },
  //   },
];
