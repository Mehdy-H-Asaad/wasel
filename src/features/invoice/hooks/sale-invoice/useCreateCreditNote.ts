"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { SALE_INVOICES } from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCreditNoteSchema,
  TCreateCreditNoteDTO,
  TCreditNoteDTO,
} from "../../schema/credit-note.schema";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetSingleSaleInvoice } from "./use-get-single-sale-invoice";
import { useEffect, useMemo } from "react";

export const useCreateCreditNote = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const originalInvoiceId = searchParams.get("original_invoice_id");

  const { invoice, isLoadingInvoice } = useGetSingleSaleInvoice({
    id: originalInvoiceId || "",
    enabled: !!originalInvoiceId,
  });

  const { mutate, isPending } = useApiMutation<
    TCreditNoteDTO,
    TCreateCreditNoteDTO
  >({
    axiosRequestMethod: "post",
    queryKey: [SALE_INVOICES, "INVOICE"],
    requestURL: `/${SALE_INVOICES}`,
    successMsg: `Credit Note ${CREATION_SUCCESS_MESSAGE}`,
    axiosType: "private",
    onSuccess: () => {
      router.push(`/admin/sales/invoices`);
    },
  });

  const CreateCreditNoteForm = useForm<TCreateCreditNoteDTO>({
    resolver: zodResolver(CreateCreditNoteSchema),
    mode: "onChange",
    // defaultValues,
  });

  // Memoize default values based on invoice data
  //   const defaultValues = useMemo(() => {
  //     const currentDate = new Date();

  //     // If we have invoice data, use it for default values
  //     if (invoice && originalInvoiceId) {
  //       return {
  //         document_type: "INVOICE" as const,
  //         actual_delivery_date: invoice.actual_delivery_date,
  //         discount_amount: invoice.discount_amount || 0,
  //         customer_id: invoice.customer_id,
  //         document_currency_code: invoice.document_currency_code,
  //         invoice_type: invoice.invoice_type,
  //         invoice_type_code: "381" as const, // Credit Note code
  //         issue_date: currentDate.toISOString().split("T")[0],
  //         issue_time: currentDate.toLocaleTimeString("en-US", {
  //           hour12: false,
  //         }),
  //         note: invoice.note || null,
  //         prices_include_tax: invoice.prices_include_tax,
  //         payment_means_code: invoice.payment_means_code,
  //         original_invoice_id: invoice.invoice_number,
  //         invoice_lines: invoice.invoice_lines.map((line) => ({
  //           description: line.description,
  //           item_id: line.item_id,
  //           item_price: line.item_price,
  //           quantity: line.quantity,
  //           price_discount: line.price_discount || 0,
  //           tax_exemption_reason_code: line.tax_exemption_reason_code || null,
  //           tax_exemption_reason: line.tax_exemption_reason || null,
  //           classified_tax_category: line.classified_tax_category,
  //           discount_amount: line.discount_amount || 0,
  //         })),
  //       };
  //     }

  //     // Otherwise use empty defaults
  //     return {
  //       document_type: "INVOICE" as const,
  //       actual_delivery_date: currentDate.toISOString().split("T")[0],
  //       discount_amount: 0,
  //       customer_id: undefined,
  //       document_currency_code: "SAR",
  //       invoice_type: "0100000" as const,
  //       invoice_type_code: "381" as const, // Credit Note code
  //       issue_date: currentDate.toISOString().split("T")[0],
  //       issue_time: currentDate.toLocaleTimeString("en-US", {
  //         hour12: false,
  //       }),
  //       note: null,
  //       prices_include_tax: undefined,
  //       payment_means_code: "",
  //       original_invoice_id: originalInvoiceId || undefined,
  //       invoice_lines: [
  //         {
  //           description: null,
  //           item_id: undefined,
  //           item_price: undefined,
  //           quantity: 1,
  //           price_discount: 0,
  //           tax_exemption_reason_code: null,
  //           tax_exemption_reason: null,
  //           classified_tax_category: undefined,
  //           discount_amount: 0,
  //         },
  //       ],
  //     };
  //   }, [invoice, originalInvoiceId]);

  useEffect(() => {
    if (invoice) {
      CreateCreditNoteForm.reset({
        ...invoice,
        invoice_lines: invoice.invoice_lines.map((line) => ({
          ...line,
          tax_exemption_reason_code: line.tax_exemption_reason_code || null,
          tax_exemption_reason: line.tax_exemption_reason || null,
        })),
      });
    }
  }, [invoice, CreateCreditNoteForm]);

  const onCreateCreditNote = (values: TCreateCreditNoteDTO) => {
    mutate(values);
  };

  return {
    onCreateCreditNote,
    CreateCreditNoteForm,
    isCreatingCreditNote: isPending,
    isLoadingInvoice,
    originalInvoice: invoice,
  };
};
