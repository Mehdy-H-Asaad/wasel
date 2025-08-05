"use client";
import { ColumnDef } from "@tanstack/react-table";

import { TTaxInvoiceLineDTO } from "@/features/invoice/types/invoice.types";
import { InvoiceLineActionCell } from "./InvoiceLineActionCell";

export const InvoiceLinesColumns: ColumnDef<TTaxInvoiceLineDTO>[] = [
	{
		accessorKey: "Name",
		header: "Item Name",
	},
	{
		accessorKey: "BaseAmount",
		header: "Base Amount",
	},
	{
		accessorKey: "InvoicedQuantity.unitCode",
		header: "Unit",
	},
	{
		accessorKey: "InvoicedQuantity.value",
		header: "Quantity",
	},
	{
		accessorKey: "DiscountAmount",
		header: "Discount Amount",
	},
	{
		accessorKey: "LineExtensionAmount",
		header: "Subtotal Before Tax",
	},
	{
		accessorKey: "TaxAmount",
		header: "Tax Amount",
	},
	{
		accessorKey: "RoundingAmount",
		header: "Rounding Amount",
	},
	{
		accessorKey: "TaxExemptionReasonCode",
		header: "Tax Exemption Reason Code",
	},
	{
		accessorKey: "TaxExemptionReason",
		header: "Tax Exemption Reason",
	},

	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => <InvoiceLineActionCell row={row} />,
	},
];
