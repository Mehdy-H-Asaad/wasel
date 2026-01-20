"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { LOGIN_QUERY_KEY } from "../constants/auth.constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordSchema,
  TForgotPasswordDTO,
} from "../schema/auth.schema";
import { useRouter } from "next/navigation";
import { useAuthUserStore } from "../store/auth-user.store";

export const useForgotPassword = () => {
  const router = useRouter();
  const { setEmail } = useAuthUserStore();
  const { mutate, isPending } = useApiMutation<
    { email: string },
    TForgotPasswordDTO
  >({
    axiosRequestMethod: "post",
    queryKey: [LOGIN_QUERY_KEY],
    requestURL: `/auth/otp/request/password-reset`,
    successMsg: "OTP sent to email",
    axiosType: "public",
    onSuccess: (data) => {
      setEmail(data.data.email);
      router.push("/reset-password/otp");
    },
  });

  const ForgotPasswordForm = useForm<TForgotPasswordDTO>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onForgotPassword = (values: TForgotPasswordDTO) => {
    mutate(values);
  };

  return {
    ForgotPasswordForm,
    onForgotPassword,
    isForgotPasswordPending: isPending,
  };
};
