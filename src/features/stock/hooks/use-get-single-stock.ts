"use client";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { TStockDTO } from "../schema/stock.schema";
import { STOCKS } from "../constants/stock.constants";

export const useGetSingleStock = ({ id }: { id: number }) => {
	const {
		data: stock,
		isFetching: isLoadingStock,
		metaData,
	} = useApiQuery<TStockDTO>({
		queryKey: [STOCKS, id],
		requestURL: `/${STOCKS}/${id}`,
		axiosConfig: {},
		axiosType: "private",
		enabled: !!id,
	});

	return { stock, isLoadingStock, metaData };
};
