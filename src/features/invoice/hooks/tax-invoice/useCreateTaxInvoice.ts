"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { INVOICES } from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TTaxInvoiceDTO } from "../../types/invoice.types";
import { taxInvoiceSchmea } from "../../schema/tax-invoice.schema";
import { useTaxInvoiceLineStore } from "../../store/tax-invoice-line.store";

export const useCreateTaxInvoice = () => {
	const { invoiceLines } = useTaxInvoiceLineStore();
	const { isPending } = useApiMutation<TTaxInvoiceDTO, TCreateTaxInvoiceDTO>({
		axiosRequestMethod: "post",
		queryKey: [INVOICES],
		requestURL: `/${INVOICES}`,
		successMsg: `Invoice ${CREATION_SUCCESS_MESSAGE}`,
	});

	const currentDate = new Date();

	const createTaxInvoiceSchema = taxInvoiceSchmea;

	type TCreateTaxInvoiceDTO = z.infer<typeof createTaxInvoiceSchema>;

	const CreateTaxInvoiceForm = useForm<TCreateTaxInvoiceDTO>({
		resolver: zodResolver(createTaxInvoiceSchema),
		mode: "onChange",
		defaultValues: {
			ActualDeliveryDate: currentDate.toISOString().split("T")[0],
			ClassifiedTaxCategory: undefined,
			TaxRate: "0",
			BuyerInfo: "",
			DiscountAmount: "",
			DocumentCurrencyCode: "SAR",
			InvoiceType: "0100000",
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

	const onCreateTaxInvoice = (values: TCreateTaxInvoiceDTO) => {
		console.log({ ...values, invoiceLines: invoiceLines || [] });
	};

	return {
		onCreateTaxInvoice,
		CreateTaxInvoiceForm,
		isCreatingTaxInvoice: isPending,
	};
};
