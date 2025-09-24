import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { INVOICES } from "../constants/invoice.constants";
import { TInvoiceDTO } from "../schema/invoice.schema";

export const useGetSingleInvoice = ({ id }: { id: string }) => {
	const { data, isFetching, metaData } = useApiQuery<TInvoiceDTO>({
		queryKey: [INVOICES, id],
		requestURL: `/${INVOICES}/${id}`,
		axiosType: "private",
	});

	return { invoice: data, isLoadingInvoice: isFetching, metaData };
};
