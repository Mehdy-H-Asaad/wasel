import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { USERS_QUERY_KEY, USERS } from "../constants/user.constants";
import { TUserDTO } from "../schema/user.schema";

export const useGetUsers = () => {
	const { data, isLoading, metaData } = useApiQuery<TUserDTO[]>({
		queryKey: [USERS_QUERY_KEY],
		requestURL: `/${USERS}`,
		axiosType: "private",
	});

	return { users: data, isLoadingUsers: isLoading, metaData };
};
