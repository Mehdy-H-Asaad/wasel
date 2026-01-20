"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { BRANCHES_QUERY_KEY } from "../constants/branch.constants";
import {
  TBranchDTO,
  TCompleteBranchTaxAuthorityDTO,
  CompleteBranchTaxAuthoritySchema,
} from "../schema/branch.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export const useBranchTaxAuthorityOTP = ({
  branchId,
}: {
  branchId: number;
}) => {
  const router = useRouter();
  const { mutate, isPending } = useApiMutation<
    TBranchDTO,
    TCompleteBranchTaxAuthorityDTO
  >({
    axiosRequestMethod: "post",
    queryKey: [BRANCHES_QUERY_KEY],
    requestURL: `/branches/tax-authority-data/complete/${branchId}`,
    successMsg: `Integrated with ZATCA Phase 2 Successfully`,
    onSuccess: () => {
      CompleteBranchTaxAuthorityForm.reset();
      router.push(`/admin/inventory/branches`);
    },
  });

  const CompleteBranchTaxAuthorityForm =
    useForm<TCompleteBranchTaxAuthorityDTO>({
      resolver: zodResolver(CompleteBranchTaxAuthoritySchema),
      defaultValues: {
        otp: "",
        tax_authority: "ZATCA_PHASE2",
      },
    });

  const onCompleteBranchTaxAuthority = (
    values: TCompleteBranchTaxAuthorityDTO
  ) => {
    mutate(values);
  };

  return {
    onCompleteBranchTaxAuthority,
    CompleteBranchTaxAuthorityForm,
    isCompleteBranchTaxAuthority: isPending,
  };
};
