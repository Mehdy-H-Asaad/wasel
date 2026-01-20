import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { POINT_OF_SALE_QUERY_KEY } from "../constants/point-of-sale.constants";
import { UPDATE_SUCCESS_MESSAGE } from "@/shared/data/constants";
import {
  UpdatePointOfSaleSchema,
  TUpdatePointOfSaleDTO,
} from "../schema/point-of-sale.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TPointOfSaleDTO } from "../schema/point-of-sale.schema";
import { useEffect } from "react";

export const useUpdatePointOfSale = ({
  pointOfSale,
}: {
  pointOfSale?: TPointOfSaleDTO;
}) => {
  const { mutate, isPending, isSuccess } = useApiMutation<
    TPointOfSaleDTO,
    TUpdatePointOfSaleDTO
  >({
    axiosRequestMethod: "patch",
    queryKey: [POINT_OF_SALE_QUERY_KEY],
    requestURL: pointOfSale ? `/points-of-sale/${pointOfSale.id}` : "",
    successMsg: `Point of Sale ${UPDATE_SUCCESS_MESSAGE}`,
  });

  const UpdatePointOfSaleForm = useForm<TUpdatePointOfSaleDTO>({
    resolver: zodResolver(UpdatePointOfSaleSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (pointOfSale) {
      UpdatePointOfSaleForm.reset({
        name: pointOfSale.name,
      });
    }
  }, [pointOfSale, UpdatePointOfSaleForm]);

  const onUpdatePointOfSale = (values: TUpdatePointOfSaleDTO) => {
    mutate(values);
  };

  return {
    UpdatePointOfSaleForm,
    onUpdatePointOfSale,
    isUpdatingPointOfSale: isPending,
    isUpdateSuccess: isSuccess,
  };
};
