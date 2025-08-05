"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { INVOICES } from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSimplifiedTaxInvoiceDTO } from "../../types/invoice.types";

import { useTaxInvoiceLineStore } from "../../store/tax-invoice-line.store";
import { simplifiedTaxInvoiceSchema } from "../../schema/simplified-tax-invoice.schema";

export const useCreateSimplifiedTaxInvoice = () => {
	const { invoiceLines } = useTaxInvoiceLineStore();
	const { isPending } = useApiMutation<
		TSimplifiedTaxInvoiceDTO,
		TCreateSimplifiedTaxInvoiceDTO
	>({
		axiosRequestMethod: "post",
		queryKey: [INVOICES],
		requestURL: `/${INVOICES}`,
		successMsg: `Invoice ${CREATION_SUCCESS_MESSAGE}`,
	});

	const currentDate = new Date();

	const createSimplifiedTaxInvoiceSchema = simplifiedTaxInvoiceSchema;

	type TCreateSimplifiedTaxInvoiceDTO = z.infer<
		typeof createSimplifiedTaxInvoiceSchema
	>;

	const CreateSimplifiedTaxInvoiceForm =
		useForm<TCreateSimplifiedTaxInvoiceDTO>({
			resolver: zodResolver(createSimplifiedTaxInvoiceSchema),
			mode: "onSubmit",
			defaultValues: {
				ActualDeliveryDate: currentDate.toISOString().split("T")[0],
				ClassifiedTaxCategory: undefined,
				TaxRate: "0",
				BuyerInfo: {},
				DiscountAmount: "",
				DocumentCurrencyCode: "SAR",
				InvoiceType: "0200000",
				InvoiceTypeCode: undefined,
				IssueDate: currentDate.toISOString().split("T")[0],
				IssueTime: currentDate.toLocaleTimeString("en-US", {
					hour12: false,
				}),
				LineExtensionAmount: "",
				Note: "",
				PayableAmount: "",
				SellerInfo: "10",
				TaxableAmount: "",
				TaxAmount: "",
				TaxInclusiveAmount: "",
				InstructionNote: "",
				OriginalInvoiceID: undefined,
				PaymentMeansCode: "",
				invoiceLines: [],
			},
		});

	const onCreateSimplifiedTaxInvoice = (
		values: TCreateSimplifiedTaxInvoiceDTO
	) => {
		console.log({ ...values, invoiceLines: invoiceLines || [] });
	};

	return {
		onCreateSimplifiedTaxInvoice,
		CreateSimplifiedTaxInvoiceForm,
		isCreatingSimplifiedTaxInvoice: isPending,
	};
};
