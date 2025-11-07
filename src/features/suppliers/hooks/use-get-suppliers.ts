import {
  SUPPLIERS,
  SUPPLIERS_QUERY_KEY,
} from "../constants/supplier.constants";
import { TSupplierDTO } from "../schema/supplier.schema";
import { useApiQuery } from "@/shared/hooks/useApiQuery";

export const useGetSuppliers = () => {
  const { data, isLoading, metaData } = useApiQuery<TSupplierDTO[]>({
    queryKey: [SUPPLIERS_QUERY_KEY],
    requestURL: `/${SUPPLIERS}`,
    axiosType: "private",
  });

  return { suppliers: data, isLoadingSuppliers: isLoading, metaData };
};
