import { Skeleton } from "@/components/ui/skeleton";
import { CreateTaxSaleInvoiceForm } from "@/features/invoice/components/sale-invoices/create-tax-sale-invoice-form/CreateTaxSaleInvoice";
import React, { Suspense } from "react";

const TaxInvoicePage = () => {
  return (
    <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
      <CreateTaxSaleInvoiceForm documentType="INVOICE" />
    </Suspense>
  );
};

export default TaxInvoicePage;
