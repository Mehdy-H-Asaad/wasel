"use client";
import { DataTable } from "@/components/common/DataTable";
import { useGetSuppliers } from "../../hooks/use-get-suppliers";
import { SuppliersColumns } from "./suppliers-columns";
import { MainButton } from "@/components/common/MainButton";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useFilterParams } from "@/shared/hooks/useFilterParams";
import { TSupplierFilters } from "../../hooks/use-get-suppliers";
import { SuppliersFilters } from "./suppliers-filters";
export const SuppliersDataTable = () => {
  const searchParams = useSearchParams();
  const { updateFilters: updateFilterParams, clearFilters } =
    useFilterParams<TSupplierFilters>();

  const filters: TSupplierFilters = {
    registration_name: searchParams.get("registration_name") ?? undefined,
    vat_number: searchParams.get("vat_number") ?? undefined,
    phone: searchParams.get("phone") ?? undefined,
  };

  const { suppliers, isLoadingSuppliers, metaData } = useGetSuppliers({
    filters,
  });

  const onFiltersChange = (filters: TSupplierFilters) => {
    updateFilterParams(filters);
  };

  const onSearchableFieldChange = (searchableField: string) => {
    updateFilterParams({ registration_name: searchableField });
  };
  const onClearFilters = () => {
    clearFilters();
  };

  return (
    <DataTable
      columns={SuppliersColumns}
      data={suppliers || []}
      isLoading={isLoadingSuppliers}
      pageCount={metaData.total_pages}
      setSearchableField={onSearchableFieldChange}
      manualPagination={true}
      totalCount={metaData.total_rows}
      searchablePlaceholder="Compnay - Supplier"
      filters={
        <SuppliersFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
          onClearFilters={onClearFilters}
        />
      }
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
