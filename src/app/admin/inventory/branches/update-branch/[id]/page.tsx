import { UpdateBranch } from "@/features/branch/components/update-branch";
import React from "react";

const UpdateBranchPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <UpdateBranch branchId={id} />;
};

export default UpdateBranchPage;
