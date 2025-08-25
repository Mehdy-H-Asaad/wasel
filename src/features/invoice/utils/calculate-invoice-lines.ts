import { TAX_RATE } from "../constants/invoice.constants";
import { TTaxInvoiceLineDTO } from "../schema/invoice-lines.schema";
import { TStockDTO } from "@/features/stock/types/stock.types";

export const calculateInvoiceLines = (
	invoiceLine: TTaxInvoiceLineDTO,
	classifiedTaxCategory: "Z" | "S",
	item: TStockDTO
) => {
	let lineExtensionAmount = parseFloat(
		(
			item.price * invoiceLine.quantity -
			(invoiceLine.discount_amount || 0)
		).toFixed(2)
	);

	let taxAmount =
		classifiedTaxCategory === "S"
			? parseFloat(((lineExtensionAmount * Number(TAX_RATE)) / 100).toFixed(2))
			: 0;

	let roundingAmount = parseFloat((lineExtensionAmount + taxAmount).toFixed(2));

	if (
		(invoiceLine.discount_amount || 0) >
		item.price * (invoiceLine.quantity || 0)
	) {
		roundingAmount = 0;
		lineExtensionAmount = 0;
		taxAmount = 0;
	}

	return {
		lineExtensionAmount,
		taxAmount,
		roundingAmount,
	};
};
