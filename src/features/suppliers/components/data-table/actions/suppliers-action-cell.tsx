"use client";
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
import Link from "next/link";

export const SuppliersActionCell = ({ row }: { row: Row<TSupplierDTO> }) => {
  const supplier = row.original;
  // const router = useRouter();

  const { onDeleteSupplier, isDeletingSupplier } = useDeleteSupplier({
    id: supplier.id,
  });

  // const handleEdit = () => {
  // 	router.push(`/admin/contacts/suppliers/${supplier.id}`);
  // };

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
          <Link href={`/admin/contacts/suppliers/${supplier.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              Update Supplier
            </Button>
          </Link>
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
