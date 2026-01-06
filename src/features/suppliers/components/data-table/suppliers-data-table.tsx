"use client";
import { DataTable } from "@/components/common/DataTable";
import { useGetSuppliers } from "../../hooks/use-get-suppliers";
import { SuppliersColumns } from "./suppliers-columns";
import { MainButton } from "@/components/common/MainButton";
import Link from "next/link";
import { Plus } from "lucide-react";

export const SuppliersDataTable = () => {
  const { suppliers, isLoadingSuppliers, metaData } = useGetSuppliers();

  return (
    <DataTable
      columns={SuppliersColumns}
      data={suppliers || []}
      isLoading={isLoadingSuppliers}
      pageCount={metaData.total_pages}
      setSearchableField={() => {}}
      manualPagination={true}
      totalCount={metaData.total_rows}
      searchablePlaceholder="Compnay - Supplier"
    >
      <Link href="/admin/contacts/suppliers/create-supplier">
        <MainButton>
          <Plus className="h-4 w-4" />
          Add Supplier
        </MainButton>
      </Link>
    </DataTable>
  );
};
