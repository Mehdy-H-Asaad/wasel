import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { POINT_OF_SALE_QUERY_KEY } from "../constants/point-of-sale.constants";
import { DELETE_SUCCESS_MESSAGE } from "@/shared/data/constants";

export const useDeletePointOfSale = (id: number) => {
  const { mutate, isPending } = useApiMutation<void, void>({
    axiosRequestMethod: "delete",
    queryKey: [POINT_OF_SALE_QUERY_KEY],
    requestURL: `/points-of-sale/${id}`,
    successMsg: `Point of Sale ${DELETE_SUCCESS_MESSAGE}`,
  });

  const onDeletePointOfSale = () => {
    mutate();
  };

  return {
    deletePointOfSale: onDeletePointOfSale,
    isDeletingPointOfSale: isPending,
  };
};
