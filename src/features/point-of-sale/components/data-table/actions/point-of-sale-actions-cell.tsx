"use client";
import { TPointOfSaleDTO } from "../../../schema/point-of-sale.schema";
import { useDeletePointOfSale } from "../../../hooks/use-delete-point-of-sale";
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
import { UpdatePointOfSaleDialog } from "../../update-point-of-sale-dialog";

export const PointOfSaleActionsCell = ({
  row,
}: {
  row: Row<TPointOfSaleDTO>;
}) => {
  const pointOfSale = row.original;
  const { deletePointOfSale, isDeletingPointOfSale } = useDeletePointOfSale(
    pointOfSale.id
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
          <UpdatePointOfSaleDialog pointOfSale={pointOfSale} />
          <DeleteDialog
            deleteFunc={deletePointOfSale}
            isLoading={isDeletingPointOfSale}
            trigger="Delete"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
