import { Skeleton } from "@/components/ui/skeleton";
import { CreateTaxSaleInvoiceForm } from "@/features/invoice/components/sale-invoices/create-tax-sale-invoice-form/CreateTaxSaleInvoice";
import React, { Suspense } from "react";

const TaxInvoicePage = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center flex-col justify-center gap-4">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[100px] w-full" />
        </div>
      }
    >
      <CreateTaxSaleInvoiceForm documentType="INVOICE" />
    </Suspense>
  );
};

export default TaxInvoicePage;
