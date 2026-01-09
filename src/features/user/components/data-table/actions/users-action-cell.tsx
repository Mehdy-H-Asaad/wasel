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
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { useDeleteUser } from "../../../hooks/use-delete-user";
export const UsersActionCell = ({ row }: { row: Row<TUserDTO> }) => {
  const user = row.original;
  const { onDeleteUser, isDeletingUser } = useDeleteUser({
    id: user.id,
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
          {!user.is_completed && (
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center capitalize"
            >
              Resend Invitation
            </Button>
          )}
          <DeleteDialog
            deleteFunc={onDeleteUser}
            isLoading={isDeletingUser}
            trigger="Delete User"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
