import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { INVOICES } from "../constants/invoice.constants";
import { TInvoiceDTO } from "../schema/invoice.schema";

type TUseGetInvoicesProps = {
  documentType: "invoice" | "quotation";
};

export const useGetInvoices = ({ documentType }: TUseGetInvoicesProps) => {
  const { data, isFetching, metaData } = useApiQuery<TInvoiceDTO[]>({
    queryKey: [INVOICES, documentType],
    requestURL: `/${INVOICES}?document_type=${documentType}`,
    axiosType: "private",
  });
  return { invoices: data, isLoadingInvoices: isFetching, metaData };
};
