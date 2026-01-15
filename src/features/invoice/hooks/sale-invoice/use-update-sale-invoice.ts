"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import {
	SALE_INVOICES,
	// TAX_EXEMPTION_REASONS_CODES,
} from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TSaleTaxInvoiceDTO,
	TUpdateSaleInvoiceDTO,
	UpdateSaleInvoiceSchema,
} from "../../schema/sale-tax-invoice.schema";
import { useRouter } from "next/navigation";

export const useUpdateSaleInvoice = ({
	documentType,
	invoiceId,
}: {
	documentType: "INVOICE" | "QUOTATION";
	invoiceId: string;
}) => {
	const router = useRouter();
	const { mutate, isPending } = useApiMutation<
		TSaleTaxInvoiceDTO,
		TUpdateSaleInvoiceDTO
	>({
		axiosRequestMethod: "put",
		queryKey: [SALE_INVOICES],
		requestURL: `/${SALE_INVOICES}/${invoiceId}`,
		successMsg: `Invoice ${CREATION_SUCCESS_MESSAGE}`,
		axiosType: "private",
		onSuccess: () => {
			router.push(`/admin/sales/${documentType.toLowerCase()}s`);
		},
	});

	const UpdateSaleInvoiceForm = useForm<TUpdateSaleInvoiceDTO>({
		resolver: zodResolver(UpdateSaleInvoiceSchema),
		mode: "onChange",
	});

	const onUpdateSaleInvoice = (values: TUpdateSaleInvoiceDTO) => {
		mutate({
			...values,
			// invoice_lines: values.invoice_lines.map((line) => ({
			//   ...line,
			//   tax_exemption_reason:
			//     line.classified_tax_category === "O"
			//       ? line.tax_exemption_reason
			//       : line.tax_exemption_reason_code
			//       ? TAX_EXEMPTION_REASONS_CODES.find(
			//           (code) => code.value === line.tax_exemption_reason_code
			//         )?.label
			//       : undefined,
			// })),
		});
	};

	return {
		onUpdateSaleInvoice,
		UpdateSaleInvoiceForm,
		isUpdatingSaleInvoice: isPending,
	};
};
