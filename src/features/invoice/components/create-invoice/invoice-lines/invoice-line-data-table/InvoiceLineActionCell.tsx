import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { TTaxInvoiceLineDTO } from "@/features/invoice/types/invoice.types";
import { useTaxInvoiceLineStore } from "@/features/invoice/store/tax-invoice-line.store";
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

export const InvoiceLineActionCell = ({
	row,
}: {
	row: Row<TTaxInvoiceLineDTO>;
}) => {
	const invoice = row.original;

	const { remove } = useTaxInvoiceLineStore();
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
					deleteFunc={() => remove(invoice.id ?? "")}
					isLoading={false}
					trigger="Delete Invoice Line"
				/>

				<UpdateInvoiceLine {...invoice} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
