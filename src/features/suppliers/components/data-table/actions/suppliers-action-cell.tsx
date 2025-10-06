import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { Row } from "@tanstack/react-table";
import { TSupplierDTO } from "../../../schema/supplier.schema";
import { useDeleteSupplier } from "../../../hooks/use-delete-supplier";
import { UpdateSupplier } from "../../update-supplier/update-supplier";

export const SuppliersActionCell = ({ row }: { row: Row<TSupplierDTO> }) => {
	const supplier = row.original;

	const { onDeleteSupplier, isDeletingSupplier } = useDeleteSupplier({
		id: supplier.id,
	});
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
					<UpdateSupplier supplier={supplier} />
					<DeleteDialog
						deleteFunc={onDeleteSupplier}
						isLoading={isDeletingSupplier}
						trigger="Delete Supplier"
					/>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
