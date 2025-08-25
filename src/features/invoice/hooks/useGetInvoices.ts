import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { INVOICES } from "../constants/invoice.constants";
import { TInvoiceDTO } from "../schema/invoice.schema";

export const useGetInvoices = () => {
	const { data, isFetching, metaData } = useApiQuery<TInvoiceDTO>({
		queryKey: [INVOICES],
		requestURL: `/${INVOICES}`,
	});

	return { invoices: data, isLoadingInvoices: isFetching, metaData };
};
