"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { SIGNUP_QUERY_KEY } from "../constants/auth.constants";
import { SignupSchema, TSignupDTO } from "../schema/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthNextStepStore } from "../store/auth-next-step.store";
import { useAuthEmailOtpStore } from "../store/auth-email-otp.store";
import { TUserDTO } from "@/features/user/schema/user.schema";

export const useSignup = () => {
	const router = useRouter();
	const { setStep } = useAuthNextStepStore();
	const { setEmail } = useAuthEmailOtpStore();
	const { mutate, isPending } = useApiMutation<TUserDTO, TSignupDTO>({
		axiosRequestMethod: "post",
		queryKey: [SIGNUP_QUERY_KEY],
		requestURL: `/auth/signup`,
		successMsg: "Signup successful",
		axiosType: "public",
		onSuccess: data => {
			setEmail(data.data.email);
			setStep(2);
			router.replace("/signup/otp");
		},
	});

	const SignupForm = useForm<TSignupDTO>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			email: "",
			password: "",
			confirm_password: "",
			name: "",
			phone: "",
		},
	});

	const onSignUp = (values: TSignupDTO) => {
		mutate(values);
	};

	return {
		SignupForm,
		onSignUp,
		isSignupPending: isPending,
	};
};
