"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { INVOICES } from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTaxInvoiceSchema,
  TCreateTaxInvoiceDTO,
  TTaxInvoiceDTO,
} from "../../schema/tax-invoice.schema";

export const useCreateTaxInvoice = () => {
  const { mutate, isPending } = useApiMutation<
    TTaxInvoiceDTO,
    TCreateTaxInvoiceDTO
  >({
    axiosRequestMethod: "post",
    queryKey: [INVOICES],
    requestURL: `/${INVOICES}`,
    successMsg: `Invoice ${CREATION_SUCCESS_MESSAGE}`,
  });

  const currentDate = new Date();

  const CreateTaxInvoiceForm = useForm<TCreateTaxInvoiceDTO>({
    resolver: zodResolver(CreateTaxInvoiceSchema),
    mode: "onChange",
    defaultValues: {
      document_type: "invoice",
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
      note: "",
      prices_include_tax: undefined,
      payment_means_code: "",
      invoice_lines: [],
    },
  });

  const onCreateTaxInvoice = (values: TCreateTaxInvoiceDTO) => {
    mutate({ ...values });
  };

  return {
    onCreateTaxInvoice,
    CreateTaxInvoiceForm,
    isCreatingTaxInvoice: isPending,
  };
};
