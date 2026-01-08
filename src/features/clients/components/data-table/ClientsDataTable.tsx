"use client";
import { DataTable } from "@/components/common/DataTable";
import { TClientFilters, useGetClients } from "../../hooks/useGetClients";
import { ClientsColumns } from "./ClientsColumns";
import { MainButton } from "@/components/common/MainButton";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useFilterParams } from "@/shared/hooks/useFilterParams";
import { ClientsFilters } from "./clients-filters";

export const ClientsDataTable = () => {
  const searchParams = useSearchParams();
  const { updateFilters: updateFilterParams, clearFilters } =
    useFilterParams<TClientFilters>();

  const filters: TClientFilters = {
    registration_name: searchParams.get("registration_name") ?? undefined,
    vat_number: searchParams.get("vat_number") ?? undefined,
    phone: searchParams.get("phone") ?? undefined,
  };

  const { metaData, clients, isLoadingClients } = useGetClients({ filters });

  const onFiltersChange = (filters: TClientFilters) => {
    updateFilterParams(filters);
  };

  const onClearFilters = () => {
    clearFilters();
  };

  const onSearchableFieldChange = (searchableField: string) => {
    updateFilterParams({ registration_name: searchableField });
  };

  return (
    <DataTable
      columns={ClientsColumns}
      data={clients || []}
      isLoading={isLoadingClients}
      pageCount={metaData.total_pages}
      setSearchableField={onSearchableFieldChange}
      manualPagination={true}
      totalCount={metaData.total_rows}
      searchablePlaceholder="Compnay - Client"
      filters={
        <ClientsFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
          onClearFilters={onClearFilters}
        />
      }
    >
      <Link href="/admin/contacts/clients/create-client">
        <MainButton>
          <Plus className="h-4 w-4" />
          Add Client
        </MainButton>
      </Link>
    </DataTable>
  );
};
