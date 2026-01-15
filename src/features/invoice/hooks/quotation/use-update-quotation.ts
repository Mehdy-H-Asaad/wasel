"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { SALE_INVOICES } from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TQuotationDTO,
	TUpdateQuotationDTO,
	UpdateQuotationSchema,
} from "../../schema/quotation.schema";
import { useRouter } from "next/navigation";

export const useUpdateQuotation = ({ quotationId }: { quotationId: string }) => {
	const router = useRouter();
	const { mutate, isPending } = useApiMutation<
		TQuotationDTO,
		TUpdateQuotationDTO
	>({
		axiosRequestMethod: "put",
		queryKey: [SALE_INVOICES],
		requestURL: `/${SALE_INVOICES}/${quotationId}`,
		successMsg: `Quotation ${CREATION_SUCCESS_MESSAGE}`,
		axiosType: "private",
		onSuccess: () => {
			router.push(`/admin/sales/quotations`);
		},
	});

	const UpdateQuotationForm = useForm<TUpdateQuotationDTO>({
		resolver: zodResolver(UpdateQuotationSchema),
		mode: "onChange",
	});

	const onUpdateQuotation = (values: TUpdateQuotationDTO) => {
		mutate({
			...values,
		});
	};

	return {
		onUpdateQuotation,
		UpdateQuotationForm,
		isUpdatingQuotation: isPending,
	};
};
