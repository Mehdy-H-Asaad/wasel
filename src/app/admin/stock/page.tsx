import { Skeleton } from "@/components/ui/skeleton";
import { StocksDataTable } from "@/features/stock/components/data-table/StocksDataTable";
import { STOCKS } from "@/features/stock/constants/stock.constants";
import { axiosPrivateClient } from "@/shared/api/axios";
import { getQueryClient } from "@/shared/providers/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { FiBox } from "react-icons/fi";

const StockPage = async () => {
	const queryClient = getQueryClient();

	// useCustomPrefetchQuery<TStockDTO[]>({
	// 	queryKey: [STOCKS],
	// 	requestURL: `/${STOCKS}`,
	// 	queryClient,
	// });

	await queryClient.prefetchQuery({
		queryKey: [STOCKS],
		queryFn: async () => {
			const { data } = await axiosPrivateClient.get(`/${STOCKS}`);
			return data;
		},
	});

	return (
		<div>
			<div className="flex items-center gap-4 py-10">
				<FiBox size={40} />
				<div className="font-bold text-5xl">Stock</div>
			</div>
			{/* <Suspense fallback={<Skeleton className="h-[500px] w-full" />}> */}
			{/* <HydrationBoundary state={dehydrate(queryClient)}> */}
			<StocksDataTable />
			{/* </HydrationBoundary> */}
			{/* </Suspense> */}
		</div>
	);
};

export default StockPage;
