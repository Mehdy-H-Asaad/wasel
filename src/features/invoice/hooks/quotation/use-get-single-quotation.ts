import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { SALE_INVOICES } from "../../constants/invoice.constants";
import { TInvoiceDTO } from "../../schema/invoice.schema";

type TUseGetSingleQuotationProps = {
	id: string;
	enabled?: boolean;
};

export const useGetSingleQuotation = ({
	id,
	enabled = true,
}: TUseGetSingleQuotationProps) => {
	const { data, isFetching } = useApiQuery<TInvoiceDTO>({
		queryKey: [SALE_INVOICES, id],
		requestURL: `/${SALE_INVOICES}/${id}`,
		axiosType: "private",
		enabled,
	});

	return {
		quotation: data,
		isLoadingQuotation: isFetching,
	};
};
