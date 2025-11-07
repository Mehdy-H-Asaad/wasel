import { useApiMutation } from "@/shared/hooks/useApiMutation";
import {
  SUPPLIERS,
  SUPPLIERS_QUERY_KEY,
} from "../constants/supplier.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import {
  CreateSupplierSchema,
  TCreateSupplierDTO,
} from "../schema/supplier.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSupplierDTO } from "../schema/supplier.schema";
import { useState } from "react";

export const useCreateSupplierShortcut = () => {
  const [open, setOpen] = useState<boolean>(false);

  const CreateSupplierForm = useForm<TCreateSupplierDTO>({
    resolver: zodResolver(CreateSupplierSchema),
    defaultValues: {
      registration_name: "",
      vat_number: "",
      street: "",
      building_number: "",
      division: "",
      city: "",
      postal_code: "",
      party_identification_scheme: "",
      party_identification_value: "",
      phone: "",
      website: "",
      bank_account: "",
      notes: null,
    },
  });

  const {
    data: supplier,
    mutate,
    isPending,
  } = useApiMutation<TSupplierDTO, TCreateSupplierDTO>({
    axiosRequestMethod: "post",
    queryKey: [SUPPLIERS_QUERY_KEY],
    requestURL: `/${SUPPLIERS}`,
    successMsg: `Supplier ${CREATION_SUCCESS_MESSAGE}`,
    onSuccess: () => {
      setOpen(false);
      CreateSupplierForm.reset();
    },
  });

  const onCreateSupplier = (values: TCreateSupplierDTO) => {
    mutate(values);
  };

  return {
    onCreateSupplier,
    CreateSupplierForm,
    isCreatingSupplier: isPending,
    open,
    setOpen,
    supplier,
  };
};
