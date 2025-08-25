"use client";
import { ColumnDef } from "@tanstack/react-table";

import { TTaxInvoiceLineDTO } from "@/features/invoice/schema/invoice-lines.schema";
import { InvoiceLineActionCell } from "./InvoiceLineActionCell";

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
		header: "Item Name",
	},
	{
		accessorKey: "item_price",
		header: "Item Price",
		cell: ({ row }) => <div>SAR {row.original.item_price.toFixed(2)}</div>,
	},
	{
		accessorKey: "quantity",
		header: "Quantity",
	},
	{
		accessorKey: "discount_amount",
		header: "Discount Amount",
		cell: ({ row }) => (
			<div>SAR {row.original.discount_amount?.toFixed(2)}</div>
		),
	},
	{
		accessorKey: "line_extension_amount",
		header: "Subtotal Before Tax",
		cell: ({ row }) => (
			<div>SAR {row.original.lineExtensionAmount.toFixed(2)}</div>
		),
	},
	{
		accessorKey: "tax_amount",
		header: "Tax Amount",
		cell: ({ row }) => <div>SAR {row.original.taxAmount.toFixed(2)}</div>,
	},
	{
		accessorKey: "rounding_amount",
		header: "Rounding Amount",
		cell: ({ row }) => <div>SAR {row.original.roundingAmount.toFixed(2)}</div>,
	},

	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => <InvoiceLineActionCell row={row} />,
	},
];
