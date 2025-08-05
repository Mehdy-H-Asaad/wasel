import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useTaxInvoiceLineStore } from "../../store/tax-invoice-line.store";
import { invoiceLinesSchema } from "../../schema/invoice-lines.schema";
import { TUpdateTaxInvoiceLineDTO } from "../../types/invoice.types";
import { toast } from "sonner";

export const useUpdateTaxInvoiceLine = () => {
	const UpdateTaxInvoicLineForm = useForm<z.infer<typeof invoiceLinesSchema>>({
		resolver: zodResolver(invoiceLinesSchema),

		defaultValues: {
			id: "",
			BaseAmount: "",
			DiscountAmount: "",
			InvoicedQuantity: { unitCode: "", value: "" },
			LineExtensionAmount: "",
			Name: "",
			RoundingAmount: "",
			TaxAmount: "",
			TaxExemptionReason: "",
			TaxExemptionReasonCode: "",
		},
	});
	const { updateInvoiceLine } = useTaxInvoiceLineStore();

	const onUpdateInvoiceLine = (values: TUpdateTaxInvoiceLineDTO) => {
		toast.success("Invoice line updated successfully");
		updateInvoiceLine(values);
	};

	return { UpdateTaxInvoicLineForm, onUpdateInvoiceLine };
};
