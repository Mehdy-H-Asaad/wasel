import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	invoiceLinesSchema,
	TCreateTaxInvoiceLineDTO,
} from "../../schema/invoice-lines.schema";

export const useCreateTaxInvoiceLine = () => {
	const CreateTaxInvoicLineForm = useForm<TCreateTaxInvoiceLineDTO>({
		resolver: zodResolver(invoiceLinesSchema),
		defaultValues: {
			discount_amount: undefined,
			item_id: 0,
			quantity: undefined,
		},
	});

	return { CreateTaxInvoicLineForm };
};
