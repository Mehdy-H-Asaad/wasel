import { SALE_INVOICES } from "../../constants/invoice.constants";
import { useApiMutation } from "@/shared/hooks/useApiMutation";

export const useIssueSaleInvoice = ({ invoiceId }: { invoiceId: string }) => {
  const { mutate, isPending } = useApiMutation<void, void>({
    axiosRequestMethod: "post",
    queryKey: [SALE_INVOICES],
    requestURL: `/${SALE_INVOICES}/submit/${invoiceId}`,
    successMsg: `Invoice Submitted Successfully`,
    axiosType: "private",
  });

  const onIssueSaleInvoice = () => {
    mutate();
  };

  return { onIssueSaleInvoice, isIssuingSaleInvoice: isPending };
};
