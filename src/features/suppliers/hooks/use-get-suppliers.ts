import {
  SUPPLIERS,
  SUPPLIERS_QUERY_KEY,
} from "../constants/supplier.constants";
import { TSupplierDTO } from "../schema/supplier.schema";
import { useApiQuery } from "@/shared/hooks/useApiQuery";

export type TSupplierFilters = {
  registration_name?: string;
  vat_number?: string;
  phone?: string;
  limit?: number;
  page?: number;
};

type TUseGetSuppliersOptions = {
  filters?: TSupplierFilters;
};

export const useGetSuppliers = ({ filters }: TUseGetSuppliersOptions) => {
  const { data, isFetching, metaData } = useApiQuery<TSupplierDTO[]>({
    queryKey: [SUPPLIERS_QUERY_KEY, filters],
    requestURL: `/${SUPPLIERS}`,
    axiosType: "private",
    axiosConfig: {
      params: {
        ...filters,
      },
    },
  });

  return { suppliers: data, isLoadingSuppliers: isFetching, metaData };
};
