import { CreateTaxSaleInvoiceForm } from "@/features/invoice/components/sale-invoices/create-tax-sale-invoice-form/CreateTaxSaleInvoice";
import React from "react";

export default function UpdateTaxInvoicePage() {
	return <CreateTaxSaleInvoiceForm documentType="INVOICE" formType="UPDATE" />;
}
