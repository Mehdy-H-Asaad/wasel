"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { LOGIN_QUERY_KEY } from "../constants/auth.constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema, TResetPasswordDTO } from "../schema/auth.schema";
import { useRouter } from "next/navigation";
import { useAuthUserStore } from "../store/auth-user.store";

export const useResetPassword = () => {
  const router = useRouter();
  const { email } = useAuthUserStore();
  const { mutate, isPending } = useApiMutation<void, TResetPasswordDTO>({
    axiosRequestMethod: "post",
    queryKey: [LOGIN_QUERY_KEY],
    requestURL: `/auth/reset-password`,
    successMsg: "OTP verified successfully",
    axiosType: "public",
    onSuccess: () => {
      router.push("/login");
    },
  });

  const ResetPasswordForm = useForm<TResetPasswordDTO>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
      email: email ?? "",
    },
  });

  const onResetPassword = (values: TResetPasswordDTO) => {
    mutate(values);
  };

  return {
    ResetPasswordForm,
    onResetPassword,
    isResetPasswordPending: isPending,
  };
};
