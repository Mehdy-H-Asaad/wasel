"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { TCompanyInfoDTO, TCreateCompanyInfoDTO } from "../types/auth.types";
import { CREATE_COMPANY_INFO_QUERY_KEY } from "../constants/auth.constants";
import { companyInfoSchema } from "../schema/company-info.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthNextStepStore } from "../store/auth-next-step.store";

export const useCreateCompanyInfo = () => {
	const router = useRouter();
	const { setStep } = useAuthNextStepStore();
	const { mutate, isPending } = useApiMutation<
		TCompanyInfoDTO,
		TCreateCompanyInfoDTO
	>({
		requestURL: `/auth/signup/complete`,
		axiosRequestMethod: "post",
		queryKey: [CREATE_COMPANY_INFO_QUERY_KEY],
		successMsg: "Company information created successfully",
		axiosType: "private",
		onSuccess: data => {
			console.log(data);
			setStep(5);
			router.replace("/signup/certificate/otp");
		},
	});

	const CreateCompanyInfoSchema = companyInfoSchema;

	const CreateCompanyInfoForm = useForm<TCreateCompanyInfoDTO>({
		resolver: zodResolver(CreateCompanyInfoSchema),
		defaultValues: {
			registraion_name: "",
			vat_number: "",
			invoicing_type: "",
			address: "",
			business_category: "",
			street: "",
			building_number: "",
			division: "",
			city: "",
			postal_code: "",
			party_identification_scheme: "",
			party_identification_value: "",
			phone: "",
		},
	});

	const onCreateCompanyInfo = (values: TCreateCompanyInfoDTO) => {
		mutate(values);
	};

	return {
		CreateCompanyInfoForm,
		onCreateCompanyInfo,
		isCreatingCompanyInfo: isPending,
	};
};
