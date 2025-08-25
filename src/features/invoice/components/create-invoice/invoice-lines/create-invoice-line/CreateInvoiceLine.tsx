import { useCreateTaxInvoiceLine } from "@/features/invoice/hooks/invoice-lines/useCreateTaxInvoiceLine";
import { InvoiceLineDialog } from "../invoice-line-form/InvoiceLineDialog";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TCreateTaxInvoiceDTO } from "@/features/invoice/schema/tax-invoice.schema";
import { invoiceLinesSchema } from "@/features/invoice/schema/invoice-lines.schema";
import { z } from "zod";
import { calculateInvoiceLines } from "@/features/invoice/utils/calculate-invoice-lines";
import { useInvoiceLineStore } from "@/features/invoice/store/invoice-line.store";
import { useGetStocks } from "@/features/stock/hooks/useGetStock";
import { toast } from "sonner";

export const CreateInvoiceLine = () => {
	const form = useFormContext<TCreateTaxInvoiceDTO>();
	const { CreateTaxInvoicLineForm } = useCreateTaxInvoiceLine();
	const { addInvoiceLine } = useInvoiceLineStore();
	const { append, fields } = useFieldArray({
		control: form.control,
		name: "invoice_lines",
	});

	const { stocks } = useGetStocks();

	const onAddInvoiceLine = (values: z.infer<typeof invoiceLinesSchema>) => {
		if (fields.find(field => field.item_id === values.item_id)) {
			return toast.error("Item already exists");
		}
		append(values);

		const stock = stocks?.find(stock => stock.id === values.item_id);

		const calculatedLine = {
			...values,

			item_name: stock ? stock.name : "",
			item_price: stock ? Number(stock.price) : 0,
			...calculateInvoiceLines(
				values,
				form.getValues("classified_tax_category"),
				stock!
			),
		};

		addInvoiceLine(calculatedLine);
		CreateTaxInvoicLineForm.reset();
	};

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
