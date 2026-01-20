import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { POINT_OF_SALE_QUERY_KEY } from "../constants/point-of-sale.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import {
  CreatePointOfSaleSchema,
  TCreatePointOfSaleDTO,
  TPointOfSaleDTO,
} from "../schema/point-of-sale.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const useCreatePointOfSaleShortcut = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    data: pointOfSale,
    mutate,
    isPending,
  } = useApiMutation<TPointOfSaleDTO, TCreatePointOfSaleDTO>({
    axiosRequestMethod: "post",
    queryKey: [POINT_OF_SALE_QUERY_KEY],
    requestURL: `/points-of-sale`,
    successMsg: `Point of Sale ${CREATION_SUCCESS_MESSAGE}`,
    onSuccess: () => {
      setOpen(false);
      CreatePointOfSaleForm.reset();
    },
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
    open,
    setOpen,
    pointOfSale,
  };
};
