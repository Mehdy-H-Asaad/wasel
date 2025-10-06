import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { CLIENTS } from "../constants/client.constant";
import { DELETE_SUCCESS_MESSAGE } from "@/shared/data/constants";

export const useDeleteClient = (id: number) => {
	const { mutate, isPending } = useApiMutation<void, void>({
		axiosRequestMethod: "delete",
		queryKey: [CLIENTS],
		requestURL: `/${CLIENTS}/${id}`,
		successMsg: `Client ${DELETE_SUCCESS_MESSAGE}`,
	});

	const onDeleteClient = () => {
		mutate();
	};

	return { deleteClient: onDeleteClient, isDeletingClient: isPending };
};
