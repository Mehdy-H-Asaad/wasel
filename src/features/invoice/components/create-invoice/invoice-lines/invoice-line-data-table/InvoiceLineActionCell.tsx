import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { UpdateInvoiceLine } from "../update-invoice-line/UpdateInvoiceLine";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TCreateTaxInvoiceDTO } from "@/features/invoice/schema/tax-invoice.schema";
import { TInvoiceLineColumns } from "./InvoiceLineColumns";
import { useInvoiceLineStore } from "@/features/invoice/store/invoice-line.store";

export const InvoiceLineActionCell = ({
	row,
}: {
	row: Row<TInvoiceLineColumns>;
}) => {
	const invoice = row.original;
	const form = useFormContext<TCreateTaxInvoiceDTO>();
	const { fields } = useFieldArray({
		control: form.control,
		name: "invoice_lines",
	});
	const { deleteInvoiceLine, invoiceLinesTable } = useInvoiceLineStore();

	const handleDelete = () => {
		const index = fields.findIndex(field => {
			return field.item_id === invoice.item_id;
		});

		if (index !== -1) {
			form.setValue("invoice_lines", [
				...invoiceLinesTable.filter(field => field.item_id !== invoice.item_id),
			]);
			deleteInvoiceLine(invoice.item_id);
		}
	};

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
				<DeleteDialog
					deleteFunc={handleDelete}
					isLoading={false}
					trigger="Delete Invoice Line"
				/>

				<UpdateInvoiceLine invoiceLine={invoice} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
