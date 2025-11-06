import { Skeleton } from "@/components/ui/skeleton";
import { CreateSaleTaxInvoice } from "@/features/invoice/components/sale-invoices/create-tax-sale-invoice-form/CreateTaxSaleInvoice";
import React, { Suspense } from "react";

const TaxInvoicePage = () => {
  return (
    <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
      <CreateSaleTaxInvoice />
    </Suspense>
  );
};

export default TaxInvoicePage;
