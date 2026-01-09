import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { BRANCHES_QUERY_KEY } from "../constants/branch.constants";
import { DELETE_SUCCESS_MESSAGE } from "@/shared/data/constants";

export const useDeleteBranch = (id: number) => {
	const { mutate, isPending } = useApiMutation<void, void>({
		axiosRequestMethod: "delete",
		queryKey: [BRANCHES_QUERY_KEY],
		requestURL: `/branches/${id}`,
		successMsg: `Branch ${DELETE_SUCCESS_MESSAGE}`,
	});

	const onDeleteBranch = () => {
		mutate();
	};

	return { deleteBranch: onDeleteBranch, isDeletingBranch: isPending };
};
