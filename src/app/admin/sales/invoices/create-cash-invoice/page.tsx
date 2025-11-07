import { Skeleton } from "@/components/ui/skeleton";
import { CreateSimplifiedSaleTaxInvoice } from "@/features/invoice/components/sale-invoices/create-simplified-sale-tax-invoice-form/create-simplified-sale-tax-invoice";
import React, { Suspense } from "react";

const SimplifiedTaxInvoice = () => {
  return (
    <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
      <CreateSimplifiedSaleTaxInvoice />
    </Suspense>
  );
};

export default SimplifiedTaxInvoice;
