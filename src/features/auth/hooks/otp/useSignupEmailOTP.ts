"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthNextStepStore } from "../../store/auth-next-step.store";
import { OTP_QUERY_KEY } from "../../constants/auth.constants";
import { TAuthUserDTO } from "../../types/auth.types";
import { OtpSchema, TOtpDTO } from "../../schema/auth.schema";
import { useAuthEmailOtpStore } from "../../store/auth-email-otp.store";
import { useAuthUserStore } from "../../store/auth-user.store";

export const useSignUpEmailOTP = () => {
	const router = useRouter();
	const { setUser } = useAuthUserStore();
	const { setStep } = useAuthNextStepStore();
	const { email } = useAuthEmailOtpStore();
	const { mutate, isPending, data } = useApiMutation<TAuthUserDTO, TOtpDTO>({
		requestURL: `/auth/verify-email`,
		axiosRequestMethod: "post",
		queryKey: [OTP_QUERY_KEY, email],
		successMsg: "OTP verified successfully",
		axiosType: "public",
		onSuccess: data => {
			setUser(data.data.user);
			setStep(3);
			router.replace("/signup/onboard-organization");
		},
	});

	const EmailOtpForm = useForm<TOtpDTO>({
		resolver: zodResolver(OtpSchema),
		defaultValues: {
			code: "",
			email: email,
		},
	});

	const onEmailOtp = (values: TOtpDTO) => mutate(values);

	return {
		EmailOtpForm,
		onEmailOtp,
		isEmailOtpPending: isPending,
		signupResponse: data,
	};
};
