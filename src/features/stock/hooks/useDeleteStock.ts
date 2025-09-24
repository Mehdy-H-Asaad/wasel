import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { STOCKS } from "../constants/stock.constants";
import { DELETE_SUCCESS_MESSAGE } from "@/shared/data/constants";

export const useDeleteStock = (id: number) => {
	const { mutate, isPending } = useApiMutation({
		queryKey: [STOCKS],
		requestURL: `/${STOCKS}/${id}`,
		successMsg: `Item ${DELETE_SUCCESS_MESSAGE}`,
		axiosRequestMethod: "delete",
	});

	const onDeleteStock = () => {
		mutate(id);
	};

	return { deleteStock: onDeleteStock, isDeletingStock: isPending };
};
