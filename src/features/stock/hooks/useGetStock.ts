"use client";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { TStockDTO } from "../schema/stock.schema";
import { STOCKS } from "../constants/stock.constants";

type UseGetStocksProps = {
  limit?: number;
  page?: number;
  filters?: {
    name?: string;
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
        limit: options?.limit || 10,
        page: options?.page || 1,
        name: options?.filters?.name,
      },
    },
    axiosType: "private",
    isZustandPagination: false,
  });

  return { stocks, isLoadingStocks, metaData };
};
