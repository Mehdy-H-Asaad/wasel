import {
	TTaxInvoiceLineDTO,
	TUpdateTaxInvoiceLineDTO,
} from "@/features/invoice/types/invoice.types";
import { create } from "zustand";
type TTaxInvoiceLineStore = {
	invoiceLines: TTaxInvoiceLineDTO[];
	addInvoiceLine: (values: TTaxInvoiceLineDTO) => void;
	remove: (index: number | string) => void;
	removeAll: () => void;
	updateInvoiceLine: (values: TUpdateTaxInvoiceLineDTO) => void;
};

export const useTaxInvoiceLineStore = create<TTaxInvoiceLineStore>(set => ({
	invoiceLines: [],
	addInvoiceLine: values =>
		set(state => ({ invoiceLines: [...state.invoiceLines, values] })),
	remove: index =>
		set(state => ({
			invoiceLines: state.invoiceLines.filter(value => value.id !== index),
		})),
	updateInvoiceLine: values =>
		set(state => ({
			invoiceLines: state.invoiceLines.map(invoiceLine => {
				if (invoiceLine.id === values.id) {
					return { ...invoiceLine, ...values };
				}
				return invoiceLine;
			}),
		})),
	removeAll: () => set(() => ({ invoiceLines: [] })),
}));
