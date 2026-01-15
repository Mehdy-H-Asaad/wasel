import { PURCHASE_INVOICES } from "../../constants/invoice.constants";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import {
	CreatePurchaseInvoiceSchema,
	TPurchaseInvoiceDTO,
} from "../../schema/purchase-invoice.schema";
import { TCreatePurchaseInvoiceDTO } from "../../schema/purchase-invoice.schema";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { EINVOICE_STATUS } from "../../schema/invoice.schema";

export const useCreatePurchaseInvoice = () => {
	const router = useRouter();
	const { mutate, isPending } = useApiMutation<
		TPurchaseInvoiceDTO,
		TCreatePurchaseInvoiceDTO
	>({
		axiosRequestMethod: "post",
		queryKey: [PURCHASE_INVOICES],
		requestURL: `/${PURCHASE_INVOICES}`,
		successMsg: `Purchase Invoice ${CREATION_SUCCESS_MESSAGE}`,
		axiosType: "private",
		onSuccess: () => {
			CreatePurchaseInvoiceForm.reset();
			router.push(`/admin/purchases/purchase-invoices`);
		},
	});

	const currentDate = new Date();

	const CreatePurchaseInvoiceForm = useForm<TCreatePurchaseInvoiceDTO>({
		resolver: zodResolver(CreatePurchaseInvoiceSchema),
		mode: "onChange",
		defaultValues: {
			document_type: "INVOICE",
			actual_delivery_date: currentDate.toISOString().split("T")[0],
			discount_amount: 0,
			supplier_id: undefined,

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
			invoice_number: "",
			invoice_lines: [
				{
					description: null,
					item_id: undefined,
					// item_name: "",
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
		},
	});

	const onCreatePurchaseInvoice = (values: TCreatePurchaseInvoiceDTO) => {
		mutate(values);
	};

	return {
		onCreatePurchaseInvoice,
		CreatePurchaseInvoiceForm,
		isCreatingPurchaseInvoice: isPending,
	};
};
