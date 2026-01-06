"use client";
import { DataTable } from "@/components/common/DataTable";
import { StockColumns } from "./StockColumns";
import { useGetStocks } from "../../hooks/useGetStock";
import { MainButton } from "@/components/common/MainButton";
import Link from "next/link";
import { Plus } from "lucide-react";

export const StocksDataTable = () => {
  const { isLoadingStocks, stocks, metaData } = useGetStocks();
  return (
    <DataTable
      columns={StockColumns}
      data={stocks || []}
      isLoading={isLoadingStocks}
      pageCount={metaData.total_pages}
      searchablePlaceholder="Stock Name"
      setSearchableField={() => {}}
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
