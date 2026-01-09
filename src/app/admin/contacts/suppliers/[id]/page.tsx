import { UpdateSupplier } from "@/features/suppliers/components/update-supplier/update-supplier";
import React from "react";

const UpdateSupplierPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <UpdateSupplier supplierId={id} />;
};

export default UpdateSupplierPage;
