import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useTaxInvoiceLineStore } from "../../store/tax-invoice-line.store";
import { invoiceLinesSchema } from "../../schema/invoice-lines.schema";
import { toast } from "sonner";

export const useCreateTaxInvoiceLine = () => {
	const CreateTaxInvoicLineForm = useForm<z.infer<typeof invoiceLinesSchema>>({
		resolver: zodResolver(invoiceLinesSchema),
		defaultValues: {
			BaseAmount: "",
			DiscountAmount: "",
			InvoicedQuantity: { unitCode: "", value: "" },
			LineExtensionAmount: "",
			Name: "",
			RoundingAmount: "",
			TaxAmount: "",
			TaxExemptionReason: "",
			TaxExemptionReasonCode: "",
			id: "",
		},
	});
	const { addInvoiceLine } = useTaxInvoiceLineStore();

	const onAddInvoiceLine = (values: z.infer<typeof invoiceLinesSchema>) => {
		addInvoiceLine({
			...values,
			id: crypto.randomUUID(),
		});
		toast.success("Invoice line added successfully");
		CreateTaxInvoicLineForm.reset();
	};

	return { CreateTaxInvoicLineForm, onAddInvoiceLine };
};
