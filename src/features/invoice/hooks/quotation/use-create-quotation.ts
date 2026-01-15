"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { SALE_INVOICES } from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CreateQuotationSchema,
	TCreateQuotationDTO,
	TQuotationDTO,
} from "../../schema/quotation.schema";
import { useRouter } from "next/navigation";
import { EINVOICE_STATUS } from "../../schema/invoice.schema";

export const useCreateQuotation = () => {
	const router = useRouter();
	const { mutate, isPending } = useApiMutation<
		TQuotationDTO,
		TCreateQuotationDTO
	>({
		axiosRequestMethod: "post",
		queryKey: [SALE_INVOICES],
		requestURL: `/${SALE_INVOICES}`,
		successMsg: `Quotation ${CREATION_SUCCESS_MESSAGE}`,
		axiosType: "private",
		onSuccess: () => {
			CreateQuotationForm.reset();
			router.push(`/admin/sales/quotations`);
		},
	});

	const currentDate = new Date();

	const CreateQuotationForm = useForm<TCreateQuotationDTO>({
		resolver: zodResolver(CreateQuotationSchema),
		mode: "onChange",
		defaultValues: {
			document_type: "QUOTATION",
			actual_delivery_date: currentDate.toISOString().split("T")[0],
			discount_amount: 0,
			customer_id: undefined,

			document_currency_code: "SAR",
			invoice_type: "0100000",
			invoice_type_code: "388",
			issue_date: currentDate.toISOString().split("T")[0],
			issue_time: currentDate.toLocaleTimeString("en-US", {
				hour12: false,
			}),
			note: null,
			prices_include_tax: undefined,
			payment_means_code: "",
			invoice_lines: [
				{
					description: null,
					item_id: undefined,
					item_price: undefined,
					quantity: 1,
					price_discount: 0,
					tax_exemption_reason_code: null,
					tax_exemption_reason: null,
					classified_tax_category: undefined,
					discount_amount: 0,
				},
			],
			status: EINVOICE_STATUS.DRAFT,
			is_locked: false,
		},
	});

	const onCreateQuotation = (values: TCreateQuotationDTO) => {
		mutate({ ...values });
	};

	return {
		onCreateQuotation,
		CreateQuotationForm,
		isCreatingQuotation: isPending,
	};
};
