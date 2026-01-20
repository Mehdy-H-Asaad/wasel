"use client";
import { DataTable } from "@/components/common/DataTable";
import { useGetPointOfSales } from "../../hooks/use-get-point-of-sales";
import { PointOfSaleColumns } from "./point-of-sale-columns";
import { CreatePointOfSaleDialog } from "../create-point-of-sale-dialog";
import { useSearchParams } from "next/navigation";
import { useFilterParams } from "@/shared/hooks/useFilterParams";

export const PointOfSaleDataTable = () => {
  const searchParams = useSearchParams();
  const { updateFilters: updateFilterParams } =
    useFilterParams<{ name?: string }>();

  const filters: { name?: string } = {
    name: searchParams.get("name") ?? undefined,
  };

  const { metaData, pointOfSales, isLoadingPointOfSales } =
    useGetPointOfSales({
      filters: {
        ...filters,
        name: searchParams.get("name") ?? undefined,
      }
    });
  const handleSearchableFieldChange = (name: string) => {
    updateFilterParams({ name });
  };


  return (
    <DataTable
      columns={PointOfSaleColumns}
      data={pointOfSales || []}
      isLoading={isLoadingPointOfSales}
      pageCount={metaData.total_pages}
      setSearchableField={handleSearchableFieldChange}
      manualPagination={true}
      totalCount={metaData.total_rows}
      searchablePlaceholder="Search by name"
    >
      <CreatePointOfSaleDialog />
    </DataTable>
  );
};
