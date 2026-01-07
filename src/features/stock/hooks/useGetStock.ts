"use client";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { TStockDTO } from "../schema/stock.schema";
import { STOCKS } from "../constants/stock.constants";

type UseGetStocksProps = {
	filters?: {
		name?: string;
		limit?: number;
		page?: number;
	};
};

export const useGetStocks = (options?: UseGetStocksProps) => {
	const {
		data: stocks,
		isFetching: isLoadingStocks,
		metaData,
	} = useApiQuery<TStockDTO[]>({
		queryKey: [STOCKS, options],
		requestURL: `/${STOCKS}`,
		axiosConfig: {
			params: {
				name: options?.filters?.name,
				...options?.filters,
			},
		},
		axiosType: "private",
		isZustandPagination: false,
	});

	return { stocks, isLoadingStocks, metaData };
};
