import { InvoiceLineDialog } from "../invoice-line-form/InvoiceLineDialog";
import { useFormContext } from "react-hook-form";
import { TCreateTaxInvoiceDTO } from "@/features/invoice/schema/tax-invoice.schema";
import {
	TTaxInvoiceLineDTO,
	TUpdateTaxInvoiceLineDTO,
} from "@/features/invoice/types/invoice.types";
import { useUpdateTaxInvoiceLine } from "@/features/invoice/hooks/invoice-lines/useUpdateTaxInvoiceLine";
import { useEffect } from "react";
import { useTaxInvoiceLineStore } from "@/features/invoice/store/tax-invoice-line.store";

export const UpdateInvoiceLine = (invoiceLine: TTaxInvoiceLineDTO) => {
	const form = useFormContext<TCreateTaxInvoiceDTO>();
	const { UpdateTaxInvoicLineForm, onUpdateInvoiceLine } =
		useUpdateTaxInvoiceLine();

	const { invoiceLines } = useTaxInvoiceLineStore();

	console.log(invoiceLines);

	useEffect(() => {
		if (invoiceLine) UpdateTaxInvoicLineForm.reset(invoiceLine);
	}, [invoiceLine, UpdateTaxInvoicLineForm]);

	const handleMutate = (values: TUpdateTaxInvoiceLineDTO) => {
		onUpdateInvoiceLine({ ...values, id: invoiceLine.id });
	};
	return (
		<InvoiceLineDialog
			form={form}
			invoiceLineForm={UpdateTaxInvoicLineForm}
			mutate={handleMutate}
			title="invoice lines"
			trigger="Update Invoice Line"
		/>
	);
};
