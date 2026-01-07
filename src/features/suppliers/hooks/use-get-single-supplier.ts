import { TSupplierDTO } from "../schema/supplier.schema";
import { SUPPLIERS } from "../constants/supplier.constants";
import { useApiQuery } from "@/shared/hooks/useApiQuery";

export const useGetSingleSupplier = ({ id }: { id: string }) => {
  const { data, isFetching, metaData } = useApiQuery<TSupplierDTO>({
    queryKey: [SUPPLIERS, id],
    requestURL: `/${SUPPLIERS}/${id}`,
    axiosType: "private",
    enabled: !!id,
  });

  return { supplier: data, isLoadingSupplier: isFetching, metaData };
};

