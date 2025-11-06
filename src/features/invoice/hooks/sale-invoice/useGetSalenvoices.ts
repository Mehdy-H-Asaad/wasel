import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { SALE_INVOICES } from "../../constants/invoice.constants";
import { TInvoiceDTO } from "../../schema/invoice.schema";

type TUseGetSaleInvoicesProps = {
  documentType: "invoice" | "quotation";
};

export const useGetSaleInvoices = ({
  documentType,
}: TUseGetSaleInvoicesProps) => {
  const { data, isFetching, metaData } = useApiQuery<TInvoiceDTO[]>({
    queryKey: [SALE_INVOICES, documentType],
    requestURL: `/${SALE_INVOICES}?document_type=${documentType}`,
    axiosType: "private",
  });
  return { invoices: data, isLoadingInvoices: isFetching, metaData };
};
