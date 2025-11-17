"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import {
  CreateOrganizationSchema,
  TCreateOrganizationDTO,
} from "../schema/organization.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { TOrganizationDTO } from "../schema/organization.schema";
import { ORGANIZATION_QUERY_KEY } from "../data/constants/organization.constants";

export const useOnboardOrganization = () => {
  const router = useRouter();
  const { mutate, isPending } = useApiMutation<
    TOrganizationDTO,
    TCreateOrganizationDTO
  >({
    requestURL: `/auth/signup/complete`,
    axiosRequestMethod: "post",
    queryKey: [ORGANIZATION_QUERY_KEY],
    successMsg: "Welcome to Wasel! You're all set up.",
    axiosType: "private",
    onSuccess: () => {
      router.replace("/admin");
    },
  });

  const CreateOrganizationForm = useForm<TCreateOrganizationDTO>({
    resolver: zodResolver(CreateOrganizationSchema),
    // mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      country_code: undefined,
      vat_number: "",
      business_category: "",
      tax_scheme: undefined,
      phone: "",
      street: "",
      building_number: "",
      division: "",
      city: "",
      postal_code: "",
      address: "",
    },
  });

  const onCreateOrganization = (values: TCreateOrganizationDTO) => {
    mutate(values);
  };

  return {
    CreateOrganizationForm,
    onCreateOrganization,
    isCreatingOrganization: isPending,
  };
};
