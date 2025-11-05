"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { INVOICES } from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateSimplifiedTaxInvoiceSchema,
  TCreateSimplifiedTaxInvoiceDTO,
  TSimplifiedTaxInvoiceDTO,
} from "../../schema/simplified-tax-invoice.schema";

export const useCreateSimplifiedTaxInvoice = () => {
  const { mutate, isPending } = useApiMutation<
    TSimplifiedTaxInvoiceDTO,
    TCreateSimplifiedTaxInvoiceDTO
  >({
    axiosRequestMethod: "post",
    queryKey: [INVOICES],
    requestURL: `/${INVOICES}`,
    successMsg: `Invoice ${CREATION_SUCCESS_MESSAGE}`,
  });

  const currentDate = new Date();

  const CreateSimplifiedTaxInvoiceForm =
    useForm<TCreateSimplifiedTaxInvoiceDTO>({
      resolver: zodResolver(CreateSimplifiedTaxInvoiceSchema),
      mode: "onChange",
      defaultValues: {
        actual_delivery_date: currentDate.toISOString().split("T")[0],
        classified_tax_category: undefined,
        tax_rate: undefined,
        // customer: "",
        discount_amount: undefined,
        document_currency_code: "SAR",
        invoice_type: "0200000",
        tax_exemption_reason_code: "",
        tax_exemption_reason: "",
        original_invoice_id: "",
        instruction_note: "",
        invoice_type_code: undefined,
        issue_date: currentDate.toISOString().split("T")[0],
        issue_time: currentDate.toLocaleTimeString("en-US", {
          hour12: false,
        }),

        registration_name: "",
        party_identification_value: "",
        note: "",
        payment_means_code: "",
        invoice_lines: [],
      },
    });

  const onCreateSimplifiedTaxInvoice = (
    values: TCreateSimplifiedTaxInvoiceDTO
  ) => {
    mutate({ ...values });
  };

  return {
    onCreateSimplifiedTaxInvoice,
    CreateSimplifiedTaxInvoiceForm,
    isCreatingSimplifiedTaxInvoice: isPending,
  };
};
