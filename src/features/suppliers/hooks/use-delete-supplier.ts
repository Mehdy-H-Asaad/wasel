import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { TSupplierDTO } from "../schema/supplier.schema";
import { DELETE_SUCCESS_MESSAGE } from "@/shared/data/constants";
import {
	SUPPLIERS,
	SUPPLIERS_QUERY_KEY,
} from "../constants/supplier.constants";

export const useDeleteSupplier = ({ id }: { id: number }) => {
	const { mutate, isPending } = useApiMutation<TSupplierDTO, void>({
		axiosRequestMethod: "delete",
		queryKey: [SUPPLIERS_QUERY_KEY],
		requestURL: `/${SUPPLIERS}/${id}`,
		successMsg: `Supplier ${DELETE_SUCCESS_MESSAGE}`,
	});

	const onDeleteSupplier = () => {
		mutate();
	};

	return { onDeleteSupplier, isDeletingSupplier: isPending };
};
