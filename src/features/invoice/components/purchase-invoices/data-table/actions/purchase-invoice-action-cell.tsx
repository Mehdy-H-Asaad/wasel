"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Eye, FileText } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { TInvoiceDTO } from "@/features/invoice/schema/invoice.schema";
import Link from "next/link";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { useDeletePurchaseInvoice } from "@/features/invoice/hooks/buy-invoice/use-delete-purchase-invoice";

export const PurchaseInvoiceActionCell = ({
	row,
}: {
	row: Row<TInvoiceDTO>;
}) => {
	const invoice = row.original;

	const { onDeletePurchaseInvoice, isDeletingPurchaseInvoice } = useDeletePurchaseInvoice({ id: invoice.id });

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
					<Link
						href={`/admin/purchases/purchase-invoices/${invoice.id}`}
					>
						<Button
							variant="outline"
							className="w-full justify-start"
						>
							<Eye className="mr-2 h-4 w-4" />
							Preview Invoice
						</Button>
					</Link>
					<Link
						href={`/admin/purchases/purchase-invoices/update-purchase-invoice/${invoice.id}`}
					>
						<Button
							variant="outline"
							className="w-full justify-start"
						>
							<Pencil className="mr-2 h-4 w-4" />
							Update Invoice
						</Button>
					</Link>
					<Link
						href={`/admin/purchases/purchase-invoices/create-debit-note?original_invoice_id=${invoice.id}`}
					>
						<Button
							variant="outline"
							className="w-full justify-start"
						>
							<FileText className="mr-2 h-4 w-4" />
							Create Debit Note
						</Button>
					</Link>
					<DeleteDialog
						deleteFunc={onDeletePurchaseInvoice}
						isLoading={isDeletingPurchaseInvoice}
						trigger="Delete Invoice"
					/>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
