"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { SIGNUP_QUERY_KEY } from "../constants/auth.constants";
import { authSchema } from "../schema/auth.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUserDTO } from "../types/auth.types";
import { useRouter } from "next/navigation";
import { useAuthNextStepStore } from "../store/auth-next-step.store";
import { useAuthEmailOtpStore } from "../store/auth-email-otp.store";

export const useSignup = () => {
	const router = useRouter();
	const { setStep } = useAuthNextStepStore();
	const { setEmail } = useAuthEmailOtpStore();
	const { mutate, isPending } = useApiMutation<
		Omit<TUserDTO, "password">,
		TSignupDTO
	>({
		axiosRequestMethod: "post",
		queryKey: [SIGNUP_QUERY_KEY],
		requestURL: `/auth/signup`,
		successMsg: "Signup successful",
		axiosType: "public",
		onSuccess: data => {
			setEmail(data.email);
			setStep(2);
			router.replace("/signup/otp");
		},
	});

	const SignupSchema = authSchema
		.pick({
			email: true,
			password: true,
			confirm_password: true,
		})
		.refine(data => data.password === data.confirm_password, {
			message: "Passwords do not match",
			path: ["confirm_password"],
		});

	type TSignupDTO = z.infer<typeof SignupSchema>;

	const SignupForm = useForm<TSignupDTO>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			email: "",
			password: "",
			confirm_password: "",
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
