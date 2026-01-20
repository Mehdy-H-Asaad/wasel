"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { LOGIN_QUERY_KEY } from "../constants/auth.constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordOTPSchema,
  TResetPasswordOTPDTO,
} from "../schema/auth.schema";
import { useRouter } from "next/navigation";
import { useAuthUserStore } from "../store/auth-user.store";

export const useResetPasswordOTP = () => {
  const router = useRouter();
  const { setEmail, email } = useAuthUserStore();
  const { mutate, isPending } = useApiMutation<
    TResetPasswordOTPDTO,
    { email: string }
  >({
    axiosRequestMethod: "post",
    queryKey: [LOGIN_QUERY_KEY],
    requestURL: `/auth/otp/verify/password-reset`,
    successMsg: "OTP verified successfully",
    axiosType: "public",
    onSuccess: (data) => {
      setEmail(data.data.email);
      router.push("/reset-password");
    },
  });

  const ResetPasswordOTPForm = useForm<TResetPasswordOTPDTO>({
    resolver: zodResolver(ResetPasswordOTPSchema),
    defaultValues: {
      code: "",
      email: email ?? "",
    },
  });

  const onResetPasswordOTP = (values: TResetPasswordOTPDTO) => {
    mutate(values);
  };

  return {
    ResetPasswordOTPForm,
    onResetPasswordOTP,
    isResetPasswordOTPPending: isPending,
  };
};
