import { create } from "zustand";
import { TInvoiceLineColumns } from "../components/create-invoice/invoice-lines/invoice-line-data-table/InvoiceLineColumns";

export type TInvoiceLineStore = {
	invoiceLinesTable: TInvoiceLineColumns[];
	addInvoiceLine: (invoiceLine: TInvoiceLineColumns) => void;
	updateInvoiceLine: (index: number, invoiceLine: TInvoiceLineColumns) => void;
	deleteInvoiceLine: (itemId: number) => void;
};

export const useInvoiceLineStore = create<TInvoiceLineStore>(set => ({
	invoiceLinesTable: [] as TInvoiceLineColumns[],
	addInvoiceLine: (invoiceLine: TInvoiceLineColumns) =>
		set((state: TInvoiceLineStore) => ({
			invoiceLinesTable: [...state.invoiceLinesTable, invoiceLine],
		})),
	updateInvoiceLine: (index: number, invoiceLine: TInvoiceLineColumns) =>
		set(state => ({
			invoiceLinesTable: state.invoiceLinesTable.map((line, i) =>
				i === index ? invoiceLine : line
			),
		})),
	deleteInvoiceLine: (itemId: number) =>
		set(state => ({
			invoiceLinesTable: state.invoiceLinesTable.filter(
				line => line.item_id !== itemId
			),
		})),
}));
