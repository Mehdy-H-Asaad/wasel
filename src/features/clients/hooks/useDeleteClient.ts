import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { CLIENTS } from "../constants/client.constant";
import { DELETE_SUCCESS_MESSAGE } from "@/shared/data/constants";

export const useDeleteClient = (id: number) => {
	const { mutate, isPending } = useApiMutation({
		axiosRequestMethod: "delete",
		queryKey: [CLIENTS],
		requestURL: `/${CLIENTS}/${id}`,
		successMsg: `Client ${DELETE_SUCCESS_MESSAGE}`,
	});

	return { deleteClient: mutate, isDeletingClient: isPending };
};
