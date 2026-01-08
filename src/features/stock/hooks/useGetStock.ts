"use client";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { TStockDTO } from "../schema/stock.schema";
import { STOCKS } from "../constants/stock.constants";

export type TStockFilters = {
  name?: string;
  limit?: number;
  page?: number;
};

type UseGetStocksProps = {
  filters?: TStockFilters;
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
        ...options?.filters,
      },
    },
    axiosType: "private",
    isZustandPagination: false,
  });

  return { stocks, isLoadingStocks, metaData };
};
