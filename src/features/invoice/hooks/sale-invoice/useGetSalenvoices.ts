import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { SALE_INVOICES } from "../../constants/invoice.constants";
import { TInvoiceDTO } from "../../schema/invoice.schema";

export type TInvoiceFilters = {
	document_type?: "INVOICE" | "QUOTATION";
	customer_id?: string;
	invoice_type?: "0100000" | "0200000";
	invoice_type_code?: "388" | "383" | "381" | "386";
	issue_date_range_from?: string;
	issue_date_range_to?: string;
	payment_means_code?: "10" | "20" | "30" | "31" | "42" | "48";
	classified_tax_category?: "S" | "Z" | "E" | "O";
	invoice_number?: string;
	page?: number;
	limit?: number;
};

type TUseGetSaleInvoicesProps = {
	documentType: "INVOICE" | "QUOTATION";
	invoiceType: "tax" | "simplified-tax";
	filters?: TInvoiceFilters;
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
		isZustandPagination: false,
		axiosConfig: {
			params: {
				invoice_type: invoiceType === "tax" ? "0100000" : "0200000",
				...filters,
			},
		},
	});
	return { invoices: data, isLoadingInvoices: isFetching, metaData };
};
