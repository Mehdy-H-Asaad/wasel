import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { CLIENTS } from "../constants/client.constant";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { CreateClientSchema, TCreateClientDTO } from "../schema/client.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TClientDTO } from "../schema/client.schema";
import { useState } from "react";

export const useCreateClientShortcut = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    data: client,
    mutate,
    isPending,
  } = useApiMutation<TClientDTO, TCreateClientDTO>({
    axiosRequestMethod: "post",
    queryKey: [CLIENTS],
    requestURL: `/${CLIENTS}`,
    successMsg: `Client ${CREATION_SUCCESS_MESSAGE}`,
    onSuccess: () => {
      setOpen(false);
      CreateClientForm.reset();
    },
  });

  const CreateClientForm = useForm<TCreateClientDTO>({
    resolver: zodResolver(CreateClientSchema),
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
      bank_account: "",
      notes: null,
    },
  });

  const onCreateClient = (values: TCreateClientDTO) => {
    mutate(values);
  };

  return {
    onCreateClient,
    CreateClientForm,
    isCreatingClient: isPending,
    open,
    setOpen,
    client,
  };
};
