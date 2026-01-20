import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { POINT_OF_SALE_QUERY_KEY } from "../constants/point-of-sale.constants";
import { TPointOfSaleDTO } from "../schema/point-of-sale.schema";

type TUseGetPointOfSalesOptions = {
  limit?: number;
  page?: number;
  filters?: {
    name?: string;
  };
};

export const useGetPointOfSales = (options?: TUseGetPointOfSalesOptions) => {
  const { data, isFetching, metaData } = useApiQuery<TPointOfSaleDTO[]>({
    queryKey: [POINT_OF_SALE_QUERY_KEY, options],
    requestURL: `/points-of-sale`,
    axiosConfig: {
      params: {
        limit: options?.limit || 10,
        page: options?.page || 1,
        name: options?.filters?.name,
      },
    },
    isZustandPagination: false,
  });

  return { pointOfSales: data, isLoadingPointOfSales: isFetching, metaData };
};
