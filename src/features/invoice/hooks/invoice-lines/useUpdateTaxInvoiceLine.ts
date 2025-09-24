import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	UpdateInvoiceLinesSchema,
	TUpdateTaxInvoiceLineDTO,
} from "../../schema/invoice-lines.schema";

export const useUpdateTaxInvoiceLine = () => {
	const UpdateTaxInvoicLineForm = useForm<TUpdateTaxInvoiceLineDTO>({
		resolver: zodResolver(UpdateInvoiceLinesSchema),
		defaultValues: {
			discount_amount: undefined,
			item_id: 0,
			quantity: undefined,
		},
	});

	return { UpdateTaxInvoicLineForm };
};
