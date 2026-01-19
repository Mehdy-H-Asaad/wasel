import { SaleInvoicesDataTable } from "@/features/invoice/components/sale-invoices/data-table/SaleInvoicesDataTable";
import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";
import React, { Suspense } from "react";

const InvoicesPage = () => {
  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <SaleInvoicesDataTable invoiceType="simplified-tax" VATDocument="TAX_INVOICE" />
    </Suspense>
  );
};

export default InvoicesPage;
