"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TStockDTO } from "../../types/stock.types";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import { StockActionsCell } from "./StockActionsCell";

export const StockColumns: ColumnDef<TStockDTO>[] = [
	{
		accessorKey: "name",
		header: "Item Name",
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => {
			return (
				<div className="font-bold text-main-green dark:text-light-green">
					{formatCurrency(row.original.price)}
				</div>
			);
		},
	},
	{
		accessorKey: "unit_code",
		header: "Unit",
	},

	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => <StockActionsCell row={row} />,
	},
];
