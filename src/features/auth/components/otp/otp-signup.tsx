"use client";
import React, { useEffect } from "react";
import { OTPForm } from "./otp-form";
import { useSignUpEmailOTP } from "../../hooks/otp/useSignupEmailOTP";
import { useRouter } from "next/navigation";
import { useAuthNextStepStore } from "../../store/auth-next-step.store";
import { useAuthEmailOtpStore } from "../../store/auth-email-otp.store";

export const OTPSignUp = () => {
	const router = useRouter();
	const { EmailOtpForm, onEmailOtp, isEmailOtpPending } = useSignUpEmailOTP();
	const { step } = useAuthNextStepStore();
	const { email } = useAuthEmailOtpStore();

	useEffect(() => {
		// If no email is stored or step is not 2, redirect to signup
		if (!email || step < 2) {
			router.replace("/signup");
		}
	}, [email, step, router]);

	// Don't render if redirecting
	if (!email || step < 2) {
		return null;
	}

	return (
		<OTPForm
			form={EmailOtpForm}
			onSubmit={onEmailOtp}
			isPending={isEmailOtpPending}
		/>
	);
};
