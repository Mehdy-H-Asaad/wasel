import { CreateBranchTaxAuthority } from "@/features/branch/components/create-branch-tax-authority";
import React from "react";

const CreateBranchTaxAuthorityPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <CreateBranchTaxAuthority branchId={id} />;
};

export default CreateBranchTaxAuthorityPage;
