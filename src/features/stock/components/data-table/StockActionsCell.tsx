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
import { TStockDTO } from "../../types/stock.types";
import { useDeleteStock } from "../../hooks/useDeleteStock";
import { UpdateStock } from "../stock-crud/UpdateStock";

export const StockActionsCell = ({ row }: { row: Row<TStockDTO> }) => {
	const stock = row.original;

	const { deleteStock, isDeletingStock } = useDeleteStock(stock.id);
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
					deleteFunc={deleteStock}
					isLoading={isDeletingStock}
					trigger="Delete Stock"
				/>

				<UpdateStock {...stock} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
