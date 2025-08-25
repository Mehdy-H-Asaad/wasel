import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TInvoiceDTO } from "../schema/invoice.schema";

export type TInvoceDetailsStore = {
	invoice: TInvoiceDTO;
	setInvoice: (invoice: TInvoiceDTO) => void;
};

export const useInvoiceDetailsStore = create(
	persist<TInvoceDetailsStore>(
		set => ({
			invoice: {} as TInvoiceDTO,
			setInvoice: (invoice: TInvoiceDTO) =>
				set(state => ({
					invoice: { ...state.invoice, ...invoice },
				})),
		}),
		{
			name: "invoice-details-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
