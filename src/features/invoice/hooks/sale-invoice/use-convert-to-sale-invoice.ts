import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { SALE_INVOICES } from "../../constants/invoice.constants";
import { TInvoiceDTO } from "../../schema/invoice.schema";

export const useConvertToSaleInvoice = ({
  invoiceId,
}: {
  invoiceId: string;
}) => {
  const { mutate, isPending } = useApiMutation<TInvoiceDTO, void>({
    axiosRequestMethod: "post",
    queryKey: [SALE_INVOICES, invoiceId],
    requestURL: `/${SALE_INVOICES}/convert/${invoiceId}`,
    successMsg: `Invoice converted to sale invoice`,
    axiosType: "private",
  });

  const onConvertToSaleInvoice = () => {
    mutate();
  };

  return { onConvertToSaleInvoice, isConvertingToSaleInvoice: isPending };
};
