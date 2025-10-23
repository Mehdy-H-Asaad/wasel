"use client";
import { ColumnDef } from "@tanstack/react-table";

import { TTaxInvoiceLineDTO } from "@/features/invoice/schema/invoice-lines.schema";
import { InvoiceLineActionCell } from "./InvoiceLineActionCell";
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Select } from "@/components/ui/select";

export type TInvoiceLineColumns = TTaxInvoiceLineDTO & {
	lineExtensionAmount: number;
	taxAmount: number;
	roundingAmount: number;
	item_name: string;
	item_price: number;
};

export const InvoiceLinesColumns: ColumnDef<TInvoiceLineColumns>[] = [
	{
		accessorKey: "item_name",
		accessorFn: row => row.item_name,
		header: "Item",
	},
	{
		accessorKey: "item_price",
		header: "Price",
		cell: ({ row }) => <div>SAR {row.original.item_price.toFixed(2)}</div>,
	},
	{
		accessorKey: "quantity",
		header: "Quantity",
		cell: ({ row }) => (
			<Select>
				<SelectTrigger className="w-full h-11">
					<SelectValue placeholder="Select Quantity" />
					<SelectContent>
						{" "}
						<SelectItem value="1">1</SelectItem>
						<SelectItem value="2">2</SelectItem>
						<SelectItem value="3">3</SelectItem>
						<SelectItem value="4">4</SelectItem>
						<SelectItem value="5">5</SelectItem>
					</SelectContent>
				</SelectTrigger>
			</Select>
		),
	},
	{
		accessorKey: "discount_amount",
		header: "Discount",
		cell: ({ row }) => (
			<div>SAR {row.original.discount_amount?.toFixed(2)}</div>
		),
	},
	{
		accessorKey: "line_extension_amount",
		header: "Subtotal",
		cell: ({ row }) => (
			<div>SAR {row.original.lineExtensionAmount.toFixed(2)}</div>
		),
	},
	{
		accessorKey: "tax_amount",
		header: "Tax",
		cell: ({ row }) => <div>SAR {row.original.taxAmount.toFixed(2)}</div>,
	},
	{
		accessorKey: "rounding_amount",
		header: "Total",
		cell: ({ row }) => <div>SAR {row.original.roundingAmount.toFixed(2)}</div>,
	},

	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => <InvoiceLineActionCell row={row} />,
	},
];
