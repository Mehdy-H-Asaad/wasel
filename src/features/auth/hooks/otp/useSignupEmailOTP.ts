"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuthNextStepStore } from "../../store/auth-next-step.store";
import { OTP_QUERY_KEY } from "../../constants/auth.constants";
import { TAuthUserDTO } from "../../types/auth.types";
import { otpSchema } from "../../schema/otp.schema";
import { useAuthEmailOtpStore } from "../../store/auth-email-otp.store";
import { useAuthUserStore } from "../../store/auth-user.store";

export const useSignUpEmailOTP = () => {
  const router = useRouter();
  const { setAccessToken, setUser } = useAuthUserStore();
  const { setStep } = useAuthNextStepStore();
  const { email } = useAuthEmailOtpStore();
  const { mutate, isPending, data } = useApiMutation<
    TAuthUserDTO,
    TEmailOtpDTO
  >({
    requestURL: `/auth/verify-email`,
    axiosRequestMethod: "post",
    queryKey: [OTP_QUERY_KEY, email],
    successMsg: "OTP verified successfully",
    axiosType: "public",
    onSuccess: (data) => {
      setAccessToken(data.data.access_token);
      setUser(data.data.user);
      setStep(3);
      router.replace("/signup/company-info");
    },
  });

  const emailOtpSchema = otpSchema;

  type TEmailOtpDTO = z.infer<typeof emailOtpSchema>;

  const EmailOtpForm = useForm<TEmailOtpDTO>({
    resolver: zodResolver(emailOtpSchema),
    defaultValues: {
      code: "",
      email: email,
    },
  });

  const onEmailOtp = (values: TEmailOtpDTO) => mutate(values);

  return {
    EmailOtpForm,
    onEmailOtp,
    isEmailOtpPending: isPending,
    signupResponse: data,
  };
};
