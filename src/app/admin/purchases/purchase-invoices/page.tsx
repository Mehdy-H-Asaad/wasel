import { PurchaseInvoicesDataTable } from "@/features/invoice/components/purchase-invoices/data-table/purchase-invoices-data-table";
import React from "react";

const page = () => {
  return <PurchaseInvoicesDataTable VATDocument="TAX_INVOICE" />;
};

export default page;
