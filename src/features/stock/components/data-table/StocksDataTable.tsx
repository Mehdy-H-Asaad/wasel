"use client";
import { DataTable } from "@/components/common/DataTable";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { CreateStock } from "../stock-crud/CreateStock";
import { StockColumns } from "./StockColumns";
import { useGetStocks } from "../../hooks/useGetStock";
import { LIMIT } from "@/shared/data/constants";

export const StocksDataTable = () => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: LIMIT,
	});

	const { isLoadingStocks, stocks, metaData } = useGetStocks();

	return (
		<div className=" border-3 p-10 rounded-lg border-[#171717] dark:bg-main-black">
			<DataTable
				columns={StockColumns}
				data={stocks || []}
				isLoading={isLoadingStocks}
				pageCount={metaData.total_pages}
				pagination={pagination}
				searchableField="name"
				searchablePlaceholder="Stock Name"
				setPagination={setPagination}
				skeletonRows={3}
			>
				<CreateStock />
			</DataTable>
		</div>
	);
};
