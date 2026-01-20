import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { POINT_OF_SALE_QUERY_KEY } from "../constants/point-of-sale.constants";
import { TPointOfSaleDTO } from "../schema/point-of-sale.schema";

export const useGetSinglePointOfSale = (id: number) => {
  const { data, isFetching } = useApiQuery<TPointOfSaleDTO>({
    queryKey: [POINT_OF_SALE_QUERY_KEY, id],
    requestURL: `/points-of-sale/${id}`,
    enabled: !!id,
  });

  return { pointOfSale: data, isLoadingPointOfSale: isFetching };
};
