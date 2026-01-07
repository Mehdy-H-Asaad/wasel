import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { PURCHASE_INVOICES } from "../../constants/invoice.constants";
import { TInvoiceDTO } from "../../schema/invoice.schema";

export type TPurchaseInvoiceFilters = {
	supplier_id?: string;
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

type TUseGetPurchaseInvoicesProps = {
	filters?: TPurchaseInvoiceFilters;
};

export const useGetPurchaseInvoices = ({
	filters,
}: TUseGetPurchaseInvoicesProps) => {
	const { data, isFetching, metaData } = useApiQuery<TInvoiceDTO[]>({
		queryKey: [PURCHASE_INVOICES, filters],
		requestURL: `/${PURCHASE_INVOICES}`,
		axiosType: "private",
		axiosConfig: {
			params: {
				...filters,
			},
		},
	});
	return {
		purchaseInvoices: data,
		isLoadingPurchaseInvoices: isFetching,
		metaData,
	};
};
