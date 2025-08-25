"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TTaxInvoiceDTO } from "../../schema/tax-invoice.schema";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { MainButton } from "@/components/common/MainButton";

export const InvoicesColumns: ColumnDef<TTaxInvoiceDTO>[] = [
	{
		accessorFn: row => row.customer || "-",
		id: "buyer-company",
		header: "Client - Company",
	},

	{
		accessorKey: "invoice_type",
		header: "Invoice Type",
		cell: ({ row }) => (
			<div>
				{row.original.invoice_type === "0100000"
					? "Tax Invoice"
					: "Simplified Tax Invoice"}
			</div>
		),
	},
	{
		accessorKey: "invoice_type_code",
		header: "Tax Compliance Documents",
		cell: ({ row }) => (
			<div>
				{row.original.invoice_type_code === "388"
					? "Tax Invoice"
					: row.original.invoice_type_code === "383"
					? "Debit Note"
					: "Credit Note"}
			</div>
		),
	},
	{
		accessorKey: "issue_date",
		header: "Issue Date",
	},
	{
		accessorKey: "payable_amount",
		header: "Payable Amount",
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const invoice = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Options</DropdownMenuLabel>
						<DropdownMenuSeparator />

						<Link href={`/admin/invoices/${invoice.id}`}>
							<MainButton>Invoice Details</MainButton>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
