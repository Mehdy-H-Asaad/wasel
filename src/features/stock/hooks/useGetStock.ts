"use client";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { TStockDTO } from "../schema/stock.schema";
import { STOCKS } from "../constants/stock.constants";

export const useGetStocks = () => {
	const {
		data: stocks,
		isFetching: isLoadingStocks,
		metaData,
	} = useApiQuery<TStockDTO[]>({
		queryKey: [STOCKS],
		requestURL: `/${STOCKS}`,
		axiosConfig: {},
		axiosType: "private",
	});

	return { stocks, isLoadingStocks, metaData };
};
