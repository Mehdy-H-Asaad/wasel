import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	invoiceLinesSchema,
	TUpdateTaxInvoiceLineDTO,
} from "../../schema/invoice-lines.schema";

export const useUpdateTaxInvoiceLine = () => {
	const UpdateTaxInvoicLineForm = useForm<TUpdateTaxInvoiceLineDTO>({
		resolver: zodResolver(invoiceLinesSchema),
		defaultValues: {
			discount_amount: undefined,
			item_id: 0,
			quantity: undefined,
		},
	});

	return { UpdateTaxInvoicLineForm };
};
