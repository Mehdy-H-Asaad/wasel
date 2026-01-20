import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { POINT_OF_SALE_QUERY_KEY } from "../constants/point-of-sale.constants";
import {
  CreatePointOfSaleSchema,
  TPointOfSaleDTO,
  TCreatePointOfSaleDTO,
} from "../schema/point-of-sale.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useCreatePointOfSale = () => {
  const { mutate, isPending, isSuccess } = useApiMutation<
    TPointOfSaleDTO,
    TCreatePointOfSaleDTO
  >({
    axiosRequestMethod: "post",
    queryKey: [POINT_OF_SALE_QUERY_KEY],
    requestURL: `/points-of-sale`,
    successMsg: `Point of Sale ${CREATION_SUCCESS_MESSAGE}`,
  });

  const CreatePointOfSaleForm = useForm<TCreatePointOfSaleDTO>({
    resolver: zodResolver(CreatePointOfSaleSchema),
    defaultValues: {
      name: "",
    },
  });

  const onCreatePointOfSale = (values: TCreatePointOfSaleDTO) => {
    mutate(values);
  };

  return {
    onCreatePointOfSale,
    CreatePointOfSaleForm,
    isCreatingPointOfSale: isPending,
    isCreateSuccess: isSuccess,
  };
};
