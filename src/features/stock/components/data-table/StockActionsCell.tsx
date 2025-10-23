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
import { TStockDTO } from "../../schema/stock.schema";
import { useDeleteStock } from "../../hooks/useDeleteStock";
import { UpdateStock } from "../UpdateStock";

export const StockActionsCell = ({ row }: { row: Row<TStockDTO> }) => {
	const stock = row.original;

	const { deleteStock: onDeleteStock, isDeletingStock } = useDeleteStock(
		Number(stock.id)
	);
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
					<UpdateStock {...stock} />
					<DeleteDialog
						deleteFunc={onDeleteStock}
						isLoading={isDeletingStock}
						trigger="Delete Stock"
					/>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
