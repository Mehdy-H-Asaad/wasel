import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CreateInvoiceLinesSchema,
  TCreateTaxInvoiceLineDTO,
} from "../../schema/invoice-lines.schema";

export const useCreateTaxInvoiceLine = () => {
  const CreateTaxInvoicLineForm = useForm<TCreateTaxInvoiceLineDTO>({
    resolver: zodResolver(CreateInvoiceLinesSchema),
    defaultValues: {
      discount_amount: undefined,
      item_id: 0,
      quantity: undefined,
      classified_tax_category: undefined,
      description: "",
      item_price: undefined,
      price_discount: 0,
      tax_exemption_reason: "",
      tax_exemption_reason_code: "",
    },
  });

  return { CreateTaxInvoicLineForm };
};
