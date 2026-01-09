import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { USERS_QUERY_KEY } from "../constants/user.constants";

export const useDeleteUser = ({ id }: { id: number }) => {
  const { mutate, isPending } = useApiMutation<void, void>({
    axiosRequestMethod: "delete",
    queryKey: [USERS_QUERY_KEY],
    requestURL: `/users/${id}`,
    successMsg: "User deleted successfully",
    axiosType: "private",
  });

  const onDeleteUser = () => {
    mutate();
  };

  return { onDeleteUser, isDeletingUser: isPending };
};
