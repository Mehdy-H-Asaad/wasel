import { UpdateSupplier } from "@/features/suppliers/components/update-supplier/update-supplier";
import React from "react";

const UpdateSupplierPage = ({ params }: { params: { id: string } }) => {
  return <UpdateSupplier supplierId={params.id} />;
};

export default UpdateSupplierPage;

