import { useCreateTaxInvoiceLine } from "@/features/invoice/hooks/invoice-lines/useCreateTaxInvoiceLine";
import { InvoiceLineDialog } from "../invoice-line-form/InvoiceLineDialog";
import { useFormContext } from "react-hook-form";
import { TCreateTaxInvoiceDTO } from "@/features/invoice/schema/tax-invoice.schema";

export const CreateInvoiceLine = () => {
	const form = useFormContext<TCreateTaxInvoiceDTO>();
	const { CreateTaxInvoicLineForm, onAddInvoiceLine } =
		useCreateTaxInvoiceLine();

	return (
		<InvoiceLineDialog
			form={form}
			invoiceLineForm={CreateTaxInvoicLineForm}
			mutate={onAddInvoiceLine}
			title="invoice lines"
			trigger="add invoice line"
		/>
	);
};
