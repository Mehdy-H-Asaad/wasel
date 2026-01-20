import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { USER_PERMISSIONS_QUERY_KEY } from "../constants/permission.constants";
import {
  TUserPermissions,
  TUpdateUserPermissions,
} from "../schema/permission.schema";

type TUseUpdateUserPermissionsOptions = {
  userId: number | string;
  onSuccess?: () => void;
};

/**
 * Hook to update permissions for a specific user
 * PUT /authorization/permissions/:userId
 */
export const useUpdateUserPermissions = ({
  userId,
  onSuccess,
}: TUseUpdateUserPermissionsOptions) => {
  const { mutate, isPending, isSuccess, isError, error } = useApiMutation<
    TUserPermissions,
    TUpdateUserPermissions
  >({
    axiosRequestMethod: "put",
    queryKey: [USER_PERMISSIONS_QUERY_KEY],
    requestURL: `/authorization/permissions/${userId}`,
    successMsg: "User permissions updated successfully",
    axiosType: "private",
    onSuccess,
  });

  return {
    updateUserPermissions: mutate,
    isUpdatingPermissions: isPending,
    isUpdateSuccess: isSuccess,
    isUpdateError: isError,
    updateError: error,
  };
};
