"use client";
import React, { useEffect } from "react";
import { OTPForm } from "./otp-form";
import { useCertificateOTP } from "../../hooks/otp/useCertificateOTP";
import { useAuthNextStepStore } from "../../store/auth-next-step.store";
import { useRouter } from "next/navigation";

export const OTPCertificate = () => {
	const { CertificateOtpForm, onCertificateOtp, isCertificateOtpPending } =
		useCertificateOTP();
	const { step } = useAuthNextStepStore();

	const router = useRouter();
	useEffect(() => {
		if (step < 5) {
			router.replace("/signup");
		}
	}, [step, router]);

	if (step < 5) {
		return null;
	}

	return (
		<OTPForm
			form={CertificateOtpForm}
			onSubmit={onCertificateOtp}
			isPending={isCertificateOtpPending}
		/>
	);
};
