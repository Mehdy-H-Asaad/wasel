import {
  SUPPLIERS,
  SUPPLIERS_QUERY_KEY,
} from "../constants/supplier.constants";
import { TSupplierDTO } from "../schema/supplier.schema";
import { useApiQuery } from "@/shared/hooks/useApiQuery";

type TUseGetSuppliersOptions = {
  limit?: number;
  page?: number;
  filters?: {
    registration_name?: string;
  };
};

export const useGetSuppliers = (options?: TUseGetSuppliersOptions) => {
  const { data, isFetching, metaData } = useApiQuery<TSupplierDTO[]>({
    queryKey: [SUPPLIERS_QUERY_KEY, options],
    requestURL: `/${SUPPLIERS}`,
    axiosType: "private",
    axiosConfig: {
      params: {
        limit: options?.limit,
        page: options?.page,
        ...options?.filters,
      },
    },
  });

  return { suppliers: data, isLoadingSuppliers: isFetching, metaData };
};
