import { useApiMutation } from "@/shared/hooks/useApiMutation";
import {
  TUserDTO,
  TInviteUserDTO,
  InviteUserSchema,
} from "../schema/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { USERS_QUERY_KEY } from "../constants/user.constants";

export const useInviteUser = () => {
  const { mutate, isPending, isSuccess } = useApiMutation<
    TUserDTO,
    TInviteUserDTO
  >({
    axiosRequestMethod: "post",
    queryKey: [USERS_QUERY_KEY],
    requestURL: `/users/invitations`,
    successMsg: "User invited successfully",
    axiosType: "private",
  });

  const InviteUserForm = useForm<TInviteUserDTO>({
    resolver: zodResolver(InviteUserSchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      role: undefined,
    },
  });

  const onInviteUser = (values: TInviteUserDTO) => {
    mutate(values);
  };

  return {
    isInvitingUserSuccess: isSuccess,
    InviteUserForm,
    onInviteUser,
    isInvitingUser: isPending,
  };
};
