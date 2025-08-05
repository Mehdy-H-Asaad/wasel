import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { INVOICES } from "../constants/invoice.constants";
import { TInvoiceDTO } from "../types/invoice.types";

export const useGetInvoices = () => {
	const { data, isFetching, metaData } = useApiQuery<TInvoiceDTO>({
		queryKey: [INVOICES],
		requestURL: `/${INVOICES}`,
	});

	return { invoices: data, isLoadingInvoices: isFetching, metaData };
};
