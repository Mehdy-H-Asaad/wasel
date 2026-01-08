"use client";
import { TClientDTO } from "../../../schema/client.schema";
import { useDeleteClient } from "../../../hooks/useDeleteClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { Row } from "@tanstack/react-table";
// import { useRouter } from "next/navigation";
import Link from "next/link";

export const ClientActionsCell = ({ row }: { row: Row<TClientDTO> }) => {
  const client = row.original;
  // const router = useRouter();
  const { deleteClient, isDeletingClient } = useDeleteClient(client.id);

  //   const handleEdit = () => {
  //     router.push(`/admin/contacts/clients/${client.id}`);
  //   };

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
          <Link href={`/admin/contacts/clients/${client.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              Update Client
            </Button>
            {/* <DropdownMenuItem>Update Client</DropdownMenuItem> */}
          </Link>
          <DeleteDialog
            deleteFunc={deleteClient}
            isLoading={isDeletingClient}
            trigger="Delete Client"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
