"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import {
  SALE_INVOICES,
  TAX_EXEMPTION_REASONS_CODES,
} from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateSaleTaxInvoiceSchema,
  TCreateSaleTaxInvoiceDTO,
  TSaleTaxInvoiceDTO,
} from "../../schema/sale-tax-invoice.schema";
import { useRouter } from "next/navigation";

export const useCreateSaleTaxInvoice = ({
  documentType,
}: {
  documentType: "invoice" | "quotation";
}) => {
  const router = useRouter();
  const { mutate, isPending } = useApiMutation<
    TSaleTaxInvoiceDTO,
    TCreateSaleTaxInvoiceDTO
  >({
    axiosRequestMethod: "post",
    queryKey: [SALE_INVOICES, documentType],
    requestURL: `/${SALE_INVOICES}`,
    successMsg: `Invoice ${CREATION_SUCCESS_MESSAGE}`,
    axiosType: "private",
    onSuccess: () => {
      CreateSaleTaxInvoiceForm.reset();
      router.push(`/admin/sales/${documentType}s`);
    },
  });

  const currentDate = new Date();

  const CreateSaleTaxInvoiceForm = useForm<TCreateSaleTaxInvoiceDTO>({
    resolver: zodResolver(CreateSaleTaxInvoiceSchema),
    mode: "onChange",
    defaultValues: {
      document_type: documentType,
      actual_delivery_date: currentDate.toISOString().split("T")[0],
      //   tax_rate: undefined,
      discount_amount: 0,
      customer_id: undefined,

      document_currency_code: "SAR",
      invoice_type: "0100000",
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

  const onCreateSaleTaxInvoice = (values: TCreateSaleTaxInvoiceDTO) => {
    mutate({
      ...values,
      invoice_lines: values.invoice_lines.map((line) => ({
        ...line,
        tax_exemption_reason:
          line.classified_tax_category === "O"
            ? line.tax_exemption_reason
            : line.tax_exemption_reason_code
            ? TAX_EXEMPTION_REASONS_CODES.find(
                (code) => code.value === line.tax_exemption_reason_code
              )?.label
            : undefined,
      })),
    });
  };

  return {
    onCreateSaleTaxInvoice,
    CreateSaleTaxInvoiceForm,
    isCreatingSaleTaxInvoice: isPending,
  };
};
