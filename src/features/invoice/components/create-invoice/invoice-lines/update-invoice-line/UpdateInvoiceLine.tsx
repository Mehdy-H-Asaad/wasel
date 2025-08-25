import { InvoiceLineDialog } from "../invoice-line-form/InvoiceLineDialog";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TCreateTaxInvoiceDTO } from "@/features/invoice/schema/tax-invoice.schema";
import { TTaxInvoiceLineDTO } from "@/features/invoice/schema/invoice-lines.schema";
import { TUpdateTaxInvoiceLineDTO } from "@/features/invoice/schema/invoice-lines.schema";
import { useUpdateTaxInvoiceLine } from "@/features/invoice/hooks/invoice-lines/useUpdateTaxInvoiceLine";
import { useEffect } from "react";
import { calculateInvoiceLines } from "@/features/invoice/utils/calculate-invoice-lines";
import { useGetStocks } from "@/features/stock/hooks/useGetStock";
import { useInvoiceLineStore } from "@/features/invoice/store/invoice-line.store";

export const UpdateInvoiceLine = ({
	invoiceLine,
}: {
	invoiceLine: TTaxInvoiceLineDTO;
}) => {
	const form = useFormContext<TCreateTaxInvoiceDTO>();
	const { UpdateTaxInvoicLineForm } = useUpdateTaxInvoiceLine();
	const { stocks } = useGetStocks();
	const { updateInvoiceLine } = useInvoiceLineStore();

	useEffect(() => {
		if (invoiceLine) UpdateTaxInvoicLineForm.reset(invoiceLine);
	}, [invoiceLine, UpdateTaxInvoicLineForm]);

	const { fields, update } = useFieldArray({
		control: form.control,
		name: "invoice_lines",
	});

	const handleMutate = (values: TUpdateTaxInvoiceLineDTO) => {
		const index = fields.findIndex(
			field => field.item_id === invoiceLine.item_id
		);

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
		update(index, calculatedLine);
		updateInvoiceLine(index, calculatedLine);
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
