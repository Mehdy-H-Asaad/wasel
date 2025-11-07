"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { SALE_INVOICES } from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateSimplifiedSaleTaxInvoiceSchema,
  TCreateSimplifiedSaleTaxInvoiceDTO,
  TSimplifiedSaleTaxInvoiceDTO,
} from "../../schema/simplified-sale-tax-invoice.schema";

export const useCreateSimplifiedSaleTaxInvoice = ({
  documentType,
}: {
  documentType: "invoice" | "quotation";
}) => {
  const { mutate, isPending } = useApiMutation<
    TSimplifiedSaleTaxInvoiceDTO,
    TCreateSimplifiedSaleTaxInvoiceDTO
  >({
    axiosRequestMethod: "post",
    queryKey: [SALE_INVOICES, documentType],
    requestURL: `/${SALE_INVOICES}`,
    successMsg: `Invoice ${CREATION_SUCCESS_MESSAGE}`,
  });

  const currentDate = new Date();

  const CreateSimplifiedSaleTaxInvoiceForm =
    useForm<TCreateSimplifiedSaleTaxInvoiceDTO>({
      resolver: zodResolver(CreateSimplifiedSaleTaxInvoiceSchema),
      mode: "onChange",
      defaultValues: {
        document_type: documentType,
        actual_delivery_date: currentDate.toISOString().split("T")[0],
        //   tax_rate: undefined,
        discount_amount: 0,
        customer_id: undefined,

        document_currency_code: "SAR",
        invoice_type: "0200000",
        invoice_type_code: "388",
        issue_date: currentDate.toISOString().split("T")[0],
        issue_time: currentDate.toLocaleTimeString("en-US", {
          hour12: false,
        }),
        note: null,
        prices_include_tax: undefined,
        payment_means_code: "",
        invoice_lines: [
          {
            description: null,
            item_id: undefined,
            // item_name: "",
            item_price: undefined,
            quantity: 1,
            price_discount: 0,
            tax_exemption_reason_code: null,
            tax_exemption_reason: null,
            classified_tax_category: undefined,
            discount_amount: 0,
          },
        ],
      },
    });

  const onCreateSimplifiedSaleTaxInvoice = (
    values: TCreateSimplifiedSaleTaxInvoiceDTO
  ) => {
    mutate({ ...values });
  };

  return {
    onCreateSimplifiedSaleTaxInvoice,
    CreateSimplifiedSaleTaxInvoiceForm,
    isCreatingSimplifiedSaleTaxInvoice: isPending,
  };
};
