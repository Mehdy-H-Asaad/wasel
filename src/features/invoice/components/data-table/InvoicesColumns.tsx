"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TTaxInvoiceDTO } from "../../types/invoice.types";
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
		accessorFn: row => row.BuyerInfo?.RegistrationName || "-",
		id: "buyer-company",
		header: "Client - Company",
	},

	{
		accessorKey: "InvoiceType",
		header: "Invoice Type",
		cell: ({ row }) => (
			<div>
				{row.original.InvoiceType === "0100000"
					? "Tax Invoice"
					: "Simplified Tax Invoice"}
			</div>
		),
	},
	{
		accessorKey: "InvoiceTypeCode",
		header: "Tax Compliance Documents",
		cell: ({ row }) => (
			<div>
				{row.original.InvoiceTypeCode === "388"
					? "Tax Invoice"
					: row.original.InvoiceTypeCode === "383"
					? "Debit Note"
					: "Credit Note"}
			</div>
		),
	},
	{
		accessorKey: "IssueDate",
		header: "Issue Date",
	},
	{
		accessorKey: "PayableAmount",
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
