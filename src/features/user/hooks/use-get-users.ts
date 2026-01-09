import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { USERS_QUERY_KEY, USERS } from "../constants/user.constants";
import { TUserDTO, USER_STATUS } from "../schema/user.schema";
import { USER_ROLES } from "../constants/user.constants";

export type TUserFilters = {
  name?: string;
  email?: string;
  phone?: string;
  role?: USER_ROLES;
  page?: number;
  limit?: number;
  status?: USER_STATUS;
  //   branch_id?: number;
  //   organization?: string;
};

type TUseGetUsersOptions = {
  filters?: TUserFilters;
};

export const useGetUsers = ({ filters }: TUseGetUsersOptions) => {
  const { data, isFetching, metaData } = useApiQuery<TUserDTO[]>({
    queryKey: [USERS_QUERY_KEY, filters],
    requestURL: `/${USERS}`,
    axiosType: "private",
    axiosConfig: {
      params: {
        ...filters,
      },
    },
  });

  return { users: data, isLoadingUsers: isFetching, metaData };
};
