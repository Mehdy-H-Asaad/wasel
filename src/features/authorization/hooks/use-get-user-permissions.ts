import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { USER_PERMISSIONS_QUERY_KEY } from "../constants/permission.constants";
import { TUserPermissions } from "../schema/permission.schema";

type TUseGetUserPermissionsOptions = {
  userId: number | string;
  enabled?: boolean;
};

/**
 * Hook to fetch permissions for a specific user
 * GET /authorization/permissions/:userId
 */
export const useGetUserPermissions = ({
  userId,
  enabled = true,
}: TUseGetUserPermissionsOptions) => {
  const { data, isFetching, error, isError, refetch } =
    useApiQuery<TUserPermissions>({
      queryKey: [USER_PERMISSIONS_QUERY_KEY, userId],
      requestURL: `/authorization/permissions/${userId}`,
      axiosType: "private",
      enabled: enabled && !!userId,
    });

  return {
    userPermissions: data,
    isLoadingUserPermissions: isFetching,
    userPermissionsError: error,
    isUserPermissionsError: isError,
    refetchUserPermissions: refetch,
  };
};
