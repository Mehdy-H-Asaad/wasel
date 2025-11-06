import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { SALE_INVOICES } from "../../constants/invoice.constants";
import { TInvoiceDTO } from "../../schema/invoice.schema";

export const useGetSingleSaleInvoice = ({ id }: { id: string }) => {
  const { data, isFetching, metaData } = useApiQuery<TInvoiceDTO>({
    queryKey: [SALE_INVOICES, id],
    requestURL: `/${SALE_INVOICES}/${id}`,
    axiosType: "private",
  });

  return { invoice: data, isLoadingInvoice: isFetching, metaData };
};
