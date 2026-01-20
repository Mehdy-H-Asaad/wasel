"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { BRANCHES_QUERY_KEY } from "../constants/branch.constants";
import {
  TBranchDTO,
  TCreateBranchTaxAuthorityDTO,
  CreateBranchTaxAuthoritySchema,
} from "../schema/branch.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export const useCreateBranchTaxAuthority = ({
  branchId,
}: {
  branchId: number;
}) => {
  const router = useRouter();
  const { mutate, isPending } = useApiMutation<
    TBranchDTO,
    TCreateBranchTaxAuthorityDTO
  >({
    axiosRequestMethod: "post",
    queryKey: [BRANCHES_QUERY_KEY],
    requestURL: `/branches/tax-authority-data/${branchId}`,
    successMsg: `Branch Tax Authority ${CREATION_SUCCESS_MESSAGE}`,
    onSuccess: () => {
      CreateBranchTaxAuthorityForm.reset();
      router.push(`/admin/inventory/branches`);
    },
  });

  const CreateBranchTaxAuthorityForm = useForm<TCreateBranchTaxAuthorityDTO>({
    resolver: zodResolver(CreateBranchTaxAuthoritySchema),
    defaultValues: {
      tax_authority: "ZATCA_PHASE2",
      country_code: "SA",
      registration_name: "",
      common_name: "",
      organization_unit_name: "",
      organization_name: "",
      vat_number: "",
      invoicing_type: "",
      address: "",
      business_category: "",
      street: "",
      building_number: "",
      division: "",
      city: "",
      postal_code: "",
      party_identification_scheme: "",
      party_identification_value: "",
      stage: "PRODUCTION",
    },
  });

  const onCreateBranchTaxAuthority = (values: TCreateBranchTaxAuthorityDTO) => {
    mutate(values);
  };

  return {
    onCreateBranchTaxAuthority,
    CreateBranchTaxAuthorityForm,
    isCreatingBranchTaxAuthority: isPending,
  };
};
