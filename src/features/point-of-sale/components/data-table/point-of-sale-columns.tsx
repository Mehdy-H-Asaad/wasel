"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TPointOfSaleDTO } from "../../schema/point-of-sale.schema";
import { PointOfSaleActionsCell } from "./actions/point-of-sale-actions-cell";

export const PointOfSaleColumns: ColumnDef<TPointOfSaleDTO>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <PointOfSaleActionsCell row={row} />;
    },
  },
];
