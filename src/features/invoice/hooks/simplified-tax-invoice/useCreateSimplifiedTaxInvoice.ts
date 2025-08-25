"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import {
	INVOICES,
	NO_TAX_RATE,
	TAX_RATE,
} from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	createSimplifiedTaxInvoiceSchema,
	TCreateSimplifiedTaxInvoiceDTO,
	TSimplifiedTaxInvoiceDTO,
} from "../../schema/simplified-tax-invoice.schema";

export const useCreateSimplifiedTaxInvoice = () => {
	const { mutate, isPending } = useApiMutation<
		TSimplifiedTaxInvoiceDTO,
		TCreateSimplifiedTaxInvoiceDTO
	>({
		axiosRequestMethod: "post",
		queryKey: [INVOICES],
		requestURL: `/${INVOICES}`,
		successMsg: `Invoice ${CREATION_SUCCESS_MESSAGE}`,
	});

	const currentDate = new Date();

	const CreateSimplifiedTaxInvoiceForm =
		useForm<TCreateSimplifiedTaxInvoiceDTO>({
			resolver: zodResolver(createSimplifiedTaxInvoiceSchema),
			mode: "onChange",
			defaultValues: {
				actual_delivery_date: currentDate.toISOString().split("T")[0],
				classified_tax_category: undefined,
				tax_rate: "",
				customer: "",
				discount_amount: null,
				document_currency_code: "SAR",
				invoice_type: "0200000",
				invoice_type_code: undefined,
				issue_date: currentDate.toISOString().split("T")[0],
				issue_time: currentDate.toLocaleTimeString("en-US", {
					hour12: false,
				}),
				party_identification_scheme: "",
				registration_name: "",
				party_identification_value: "",
				note: "",
				instruction_note: "",
				original_invoice_id: undefined,
				payment_means_code: "",
				invoice_lines: [],
			},
		});

	const onCreateSimplifiedTaxInvoice = (
		values: TCreateSimplifiedTaxInvoiceDTO
	) => {
		const taxRate = values.tax_rate === "0" ? NO_TAX_RATE : TAX_RATE;
		mutate({ ...values, tax_rate: taxRate });
	};

	return {
		onCreateSimplifiedTaxInvoice,
		CreateSimplifiedTaxInvoiceForm,
		isCreatingSimplifiedTaxInvoice: isPending,
	};
};
