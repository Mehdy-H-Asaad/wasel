import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { TUserDTO } from "../../../schema/user.schema";

export const UsersActionCell = ({ row }: { row: Row<TUserDTO> }) => {
	const user = row.original;

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
					<Button variant="ghost" size="sm" className="w-full justify-start">
						View Details
					</Button>
					{!user.is_completed && (
						<Button variant="ghost" size="sm" className="w-full justify-start">
							Resend Invitation
						</Button>
					)}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
