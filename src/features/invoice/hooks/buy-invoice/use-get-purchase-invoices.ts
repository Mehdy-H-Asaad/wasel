import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { PURCHASE_INVOICES } from "../../constants/invoice.constants";
import { TInvoiceDTO } from "../../schema/invoice.schema";

export const useGetPurchaseInvoices = () => {
  const { data, isFetching, metaData } = useApiQuery<TInvoiceDTO[]>({
    queryKey: [PURCHASE_INVOICES],
    requestURL: `/${PURCHASE_INVOICES}`,
    axiosType: "private",
  });
  return {
    purchaseInvoices: data,
    isLoadingPurchaseInvoices: isFetching,
    metaData,
  };
};
