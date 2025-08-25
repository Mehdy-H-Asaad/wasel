"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuthNextStepStore } from "../../store/auth-next-step.store";
import { OTP_QUERY_KEY } from "../../constants/auth.constants";
import { otpSchema } from "../../schema/otp.schema";
import { useAuthEmailOtpStore } from "../../store/auth-email-otp.store";
import { TUserDTO } from "../../types/auth.types";

export const useCertificateOTP = () => {
	const router = useRouter();
	const { email } = useAuthEmailOtpStore();
	const { setStep } = useAuthNextStepStore();

	const { mutate, isPending } = useApiMutation<
		Pick<TUserDTO, "email">,
		TEmailOtpDTO
	>({
		requestURL: `/csid/compliance`,
		axiosRequestMethod: "post",
		queryKey: [OTP_QUERY_KEY],
		successMsg: "OTP verified successfully",
		axiosType: "private",
		onSuccess: () => {
			setStep(6);
			router.replace("/admin");
		},
	});

	const emailOtpSchema = otpSchema;

	type TEmailOtpDTO = z.infer<typeof emailOtpSchema>;

	const CertificateOtpForm = useForm<TEmailOtpDTO>({
		resolver: zodResolver(emailOtpSchema),
		defaultValues: {
			code: "",
			email: email,
		},
	});

	const onCertificateOtp = (values: TEmailOtpDTO) => mutate(values);

	return {
		CertificateOtpForm,
		onCertificateOtp,
		isCertificateOtpPending: isPending,
	};
};
