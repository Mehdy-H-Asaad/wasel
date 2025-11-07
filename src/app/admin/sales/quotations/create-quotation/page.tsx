import React from "react";
import { CreateTaxSaleInvoiceForm } from "@/features/invoice/components/sale-invoices/create-tax-sale-invoice-form/CreateTaxSaleInvoice";

const page = () => {
  return <CreateTaxSaleInvoiceForm documentType="quotation" />;
};

export default page;
