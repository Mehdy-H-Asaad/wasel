import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { PURCHASE_INVOICES } from "../../constants/invoice.constants";
import { TInvoiceDTO } from "../../schema/invoice.schema";

type TUseGetSinglePurchaseInvoiceProps = {
	id: string;
	enabled?: boolean;
};

export const useGetSinglePurchaseInvoice = ({
	id,
	enabled = true,
}: TUseGetSinglePurchaseInvoiceProps) => {
	const { data, isFetching } = useApiQuery<TInvoiceDTO>({
		queryKey: [PURCHASE_INVOICES, id],
		requestURL: `/${PURCHASE_INVOICES}/${id}`,
		axiosType: "private",
		enabled,
	});

	return {
		purchaseInvoice: data,
		isLoadingPurchaseInvoice: isFetching,
	};
};
