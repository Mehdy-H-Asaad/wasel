import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { PERMISSIONS_QUERY_KEY } from "../constants/permission.constants";
import { TAllPermissions } from "../schema/permission.schema";

/**
 * Hook to fetch all available permissions in the system
 * GET /authorization/permissions
 */
export const useGetPermissions = () => {
  const { data, isFetching, error, isError } = useApiQuery<TAllPermissions>({
    queryKey: [PERMISSIONS_QUERY_KEY],
    requestURL: `/authorization/permissions`,
    axiosType: "private",
  });

  return {
    permissions: data,
    isLoadingPermissions: isFetching,
    permissionsError: error,
    isPermissionsError: isError,
  };
};
