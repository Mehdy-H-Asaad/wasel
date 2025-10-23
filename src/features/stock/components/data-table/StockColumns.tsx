"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TStockDTO } from "../../schema/stock.schema";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import { StockActionsCell } from "./StockActionsCell";

export const StockColumns: ColumnDef<TStockDTO>[] = [
	{
		accessorKey: "name",
		header: "Item Name",
	},
	{
		accessorKey: "default_sale_price",
		header: "Sale Price",
		cell: ({ row }) => {
			return (
				<div className="font-bold bg-green-100 px-2 py-1 rounded-md w-fit text-green-700 dark:bg-green-900 dark:text-green-100">
					{formatCurrency(row.original.default_sale_price)}
				</div>
			);
		},
	},
	{
		accessorKey: "default_buy_price",
		header: "Buy Price",
		cell: ({ row }) => {
			return (
				<div className="font-bold bg-green-100 px-2 py-1 rounded-md w-fit text-green-700 dark:bg-green-900 dark:text-green-100">
					{formatCurrency(row.original.default_buy_price)}
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
