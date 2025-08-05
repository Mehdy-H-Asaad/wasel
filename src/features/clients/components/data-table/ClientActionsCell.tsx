import { TClientDTO } from "../../types/client.types";
import { useDeleteClient } from "../../hooks/useDeleteClient";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { UpdateClient } from "../UpdateClient";
import { Row } from "@tanstack/react-table";

export const ClientActionsCell = ({ row }: { row: Row<TClientDTO> }) => {
	const client = row.original;

	const { deleteClient, isDeletingClient } = useDeleteClient(client.id);

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
					deleteFunc={deleteClient}
					isLoading={isDeletingClient}
					trigger="Delete Client"
				/>

				<UpdateClient {...client} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
