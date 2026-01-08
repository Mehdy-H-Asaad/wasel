"use client";
import { DataTable } from "@/components/common/DataTable";
import { StockColumns } from "./StockColumns";
import { TStockFilters, useGetStocks } from "../../hooks/useGetStock";
import { MainButton } from "@/components/common/MainButton";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useFilterParams } from "@/shared/hooks/useFilterParams";

export const StocksDataTable = () => {
  const searchParams = useSearchParams();
  const { updateFilters: updateFilterParams } =
    useFilterParams<TStockFilters>();

  const filters: TStockFilters = {
    name: searchParams.get("name") ?? undefined,
  };
  const { isLoadingStocks, stocks, metaData } = useGetStocks({
    filters,
  });

  const handleSearchableFieldChange = (name: string) => {
    updateFilterParams({ name });
  };
  // const handleClearFilters = () => {
  //   clearFilters();
  // };

  return (
    <DataTable
      columns={StockColumns}
      data={stocks || []}
      isLoading={isLoadingStocks}
      pageCount={metaData.total_pages}
      searchablePlaceholder="Stock Name"
      setSearchableField={handleSearchableFieldChange}
    >
      <Link href="/admin/inventory/stock/create-stock">
        <MainButton>
          <Plus className="h-4 w-4" />
          Create Stock
        </MainButton>
      </Link>
    </DataTable>
  );
};
