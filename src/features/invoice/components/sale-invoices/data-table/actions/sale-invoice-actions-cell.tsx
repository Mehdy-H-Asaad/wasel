"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, FileText, Pencil, Eye } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { EINVOICE_STATUS, TInvoiceDTO } from "@/features/invoice/schema/invoice.schema";
import Link from "next/link";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { useDeleteSaleInvoice } from "@/features/invoice/hooks/sale-invoice/use-delete-sale-invoice";
import { IssueInvoiceDialog } from "./issue-invoice-dialog";
import { useIssueSaleInvoice } from "@/features/invoice/hooks/sale-invoice/use-issue-sale-invoice";
// import { useUpdateSaleInvoice } from "@/features/invoice/hooks/sale-invoice/use-update-sale-invoice";

export const SaleInvoiceActionCell = ({ row }: { row: Row<TInvoiceDTO> }) => {
	const invoice = row.original;


	// const { onUpdateSaleInvoice, isUpdatingSaleInvoice } = useUpdateSaleInvoice({ invoiceId: String(invoice.id), documentType: invoice.document_type as "INVOICE" | "QUOTATION" })
	const { onIssueSaleInvoice, isIssuingSaleInvoice } = useIssueSaleInvoice({ invoiceId: String(invoice.id) });
	const { onDeleteSaleInvoice, isDeletingSaleInvoice } = useDeleteSaleInvoice({ id: invoice.id });
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
				<div className="flex flex-col gap-2">
					<Link href={`/admin/sales/invoices/invoice-details/${invoice.id}`}>
						<Button
							variant="outline"
							className="w-full justify-start"
						>
							<Eye className="size-4" />
							Preview Invoice
						</Button>
					</Link>
					{invoice.status === EINVOICE_STATUS.DRAFT && (
						<Link href={`/admin/sales/invoices/update-${invoice.invoice_type === "0100000" ? "tax" : "cash"}-invoice/${invoice.id}`}>
							<Button
								variant="outline"
								className="w-full justify-start"
							>
								<Pencil className="size-4" />
								Update Invoice
							</Button>
						</Link>
					)}
					{invoice.status === EINVOICE_STATUS.DRAFT && (

						<IssueInvoiceDialog onIssueInvoice={onIssueSaleInvoice} isLoading={isIssuingSaleInvoice} dialogTriggerText="Issue Invoice" />
					)}
					{invoice.status !== EINVOICE_STATUS.DRAFT &&
						<Link
							href={`/admin/sales/invoices/create-credit-note?original_invoice_id=${invoice.id}`}
						>
							<Button
								variant="outline"
								className="w-full justify-start"
							>
								<FileText className="size-4" />
								Create Credit Note
							</Button>
						</Link>
					}
					{invoice.status === EINVOICE_STATUS.ISSUED && (
						<IssueInvoiceDialog onIssueInvoice={onIssueSaleInvoice} isLoading={isIssuingSaleInvoice} dialogTriggerText="Submit to ZATCA" />
					)}
					{invoice.status === EINVOICE_STATUS.DRAFT && (
						<DeleteDialog deleteFunc={onDeleteSaleInvoice} trigger="Delete Invoice" isLoading={isDeletingSaleInvoice} />
					)}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
