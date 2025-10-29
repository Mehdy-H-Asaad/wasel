import { TAX_RATE } from "../constants/invoice.constants";
import { TTaxInvoiceLineDTO } from "../schema/invoice-lines.schema";

export const calculateInvoiceLines = (
  invoiceLine: TTaxInvoiceLineDTO,
  classifiedTaxCategory: "Z" | "S" | "E" | "O",
  pricesIncludeTax: boolean
) => {
  const total =
    invoiceLine && classifiedTaxCategory
      ? (invoiceLine.item_price || 0) * (invoiceLine.quantity || 0) -
        (invoiceLine.discount_amount || 0)
      : 0;

  let lineExtensionAmount = 0;
  let taxAmount = 0;
  let roundingAmount = 0;

  if (pricesIncludeTax) {
    lineExtensionAmount =
      (total * 100) / (100 + (classifiedTaxCategory === "S" ? TAX_RATE : 0));

    taxAmount = total - lineExtensionAmount;

    roundingAmount = lineExtensionAmount + taxAmount;
  } else {
    lineExtensionAmount = total;
    taxAmount =
      classifiedTaxCategory === "S"
        ? (lineExtensionAmount * TAX_RATE) / 100
        : 0;
    roundingAmount = lineExtensionAmount + taxAmount;
  }

  return {
    lineExtensionAmount,
    taxAmount,
    roundingAmount,
  };
};
