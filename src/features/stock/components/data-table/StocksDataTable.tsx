"use client";
import { DataTable } from "@/components/common/DataTable";
import { CreateStock } from "../CreateStock";
import { StockColumns } from "./StockColumns";
import { useGetStocks } from "../../hooks/useGetStock";

export const StocksDataTable = () => {
	const { isLoadingStocks, stocks, metaData } = useGetStocks();
	console.log(stocks);
	return (
		<DataTable
			columns={StockColumns}
			data={stocks || []}
			isLoading={isLoadingStocks}
			pageCount={metaData.total_pages}
			searchablePlaceholder="Stock Name"
			setSearchableField={() => {}}
		>
			<CreateStock />
		</DataTable>
	);
};
