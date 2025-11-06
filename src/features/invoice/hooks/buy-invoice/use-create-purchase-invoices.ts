import { PURCHASE_INVOICES } from "../../constants/invoice.constants";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import {
  CreatePurchaseInvoiceSchema,
  TPurchaseInvoiceDTO,
} from "../../schema/purchase-invoice.schema";
import { TCreatePurchaseInvoiceDTO } from "../../schema/purchase-invoice.schema";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCreatePurchaseInvoice = () => {
  const { mutate, isPending } = useApiMutation<
    TPurchaseInvoiceDTO,
    TCreatePurchaseInvoiceDTO
  >({
    axiosRequestMethod: "post",
    queryKey: [PURCHASE_INVOICES],
    requestURL: `/${PURCHASE_INVOICES}`,
    successMsg: `Purchase Invoice ${CREATION_SUCCESS_MESSAGE}`,
  });

  const currentDate = new Date();

  const CreatePurchaseInvoiceForm = useForm<TCreatePurchaseInvoiceDTO>({
    resolver: zodResolver(CreatePurchaseInvoiceSchema),
    mode: "onChange",
    defaultValues: {
      document_type: "invoice",
      actual_delivery_date: currentDate.toISOString().split("T")[0],
      discount_amount: 0,
      supplier_id: undefined,
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

  const onCreatePurchaseInvoice = (values: TCreatePurchaseInvoiceDTO) => {
    mutate(values);
  };

  return {
    onCreatePurchaseInvoice,
    CreatePurchaseInvoiceForm,
    isCreatingPurchaseInvoice: isPending,
  };
};
