"use client";
import { TBranchDTO } from "../../../schema/branch.schema";
import { useDeleteBranch } from "../../../hooks/use-delete-branch";
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
import { Row } from "@tanstack/react-table";
import Link from "next/link";

export const BranchActionsCell = ({ row }: { row: Row<TBranchDTO> }) => {
  const branch = row.original;
  const { deleteBranch, isDeletingBranch } = useDeleteBranch(branch.id);

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
          <Link href={`/admin/inventory/branches/update-branch/${branch.id}`}>
            <Button variant="outline" className="w-full justify-start">
              Update Branch
            </Button>
          </Link>
          <DeleteDialog
            deleteFunc={deleteBranch}
            isLoading={isDeletingBranch}
            trigger="Delete Branch"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
