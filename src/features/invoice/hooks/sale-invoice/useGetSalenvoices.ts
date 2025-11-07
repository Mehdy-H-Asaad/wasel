import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { SALE_INVOICES } from "../../constants/invoice.constants";
import { TInvoiceDTO } from "../../schema/invoice.schema";
import { SaleInvoiceFiltersType } from "../../components/sale-invoices/data-table/SaleInvoiceFilters";

type TUseGetSaleInvoicesProps = {
  documentType: "invoice" | "quotation";
  invoiceType: "tax" | "simplified-tax";
  filters?: SaleInvoiceFiltersType;
};

export const useGetSaleInvoices = ({
  documentType,
  invoiceType,
  filters,
}: TUseGetSaleInvoicesProps) => {
  const { data, isFetching, metaData } = useApiQuery<TInvoiceDTO[]>({
    queryKey: [SALE_INVOICES, documentType, invoiceType, filters],
    requestURL: `/${SALE_INVOICES}?document_type=${documentType}`,
    axiosType: "private",
    axiosConfig: {
      params: {
        invoice_type: invoiceType === "tax" ? "0100000" : "0200000",
        ...filters,
        // ...(filters?.invoice_type_code && {
        //   invoice_type_code: filters.invoice_type_code,
        // }),
        // ...(filters?.payment_means_code && {
        //   payment_means_code: filters.payment_means_code,
        // }),
        // ...(filters?.party_identification_scheme && {
        //   party_identification_scheme: filters.party_identification_scheme,
        // }),
      },
    },
  });
  return { invoices: data, isLoadingInvoices: isFetching, metaData };
};
