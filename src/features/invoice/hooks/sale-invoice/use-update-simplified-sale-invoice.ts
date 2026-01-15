"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { SALE_INVOICES } from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TSimplifiedSaleTaxInvoiceDTO,
	TUpdateSimplifiedSaleInvoiceDTO,
	UpdateSimplifiedSaleInvoiceSchema,
} from "../../schema/simplified-sale-tax-invoice.schema";
import { useRouter } from "next/navigation";

export const useUpdateSimplifiedSaleInvoice = ({
	invoiceId,
}: {
	invoiceId: string;
}) => {
	const router = useRouter();
	const { mutate, isPending } = useApiMutation<
		TSimplifiedSaleTaxInvoiceDTO,
		TUpdateSimplifiedSaleInvoiceDTO
	>({
		axiosRequestMethod: "put",
		queryKey: [SALE_INVOICES],
		requestURL: `/${SALE_INVOICES}/${invoiceId}`,
		successMsg: `Invoice ${CREATION_SUCCESS_MESSAGE}`,
		axiosType: "private",
		onSuccess: () => {
			router.push(`/admin/sales/cash-invoices`);
		},
	});

	const UpdateSimplifiedSaleInvoiceForm =
		useForm<TUpdateSimplifiedSaleInvoiceDTO>({
			resolver: zodResolver(UpdateSimplifiedSaleInvoiceSchema),
			mode: "onChange",
		});

	const onUpdateSimplifiedSaleInvoice = (
		values: TUpdateSimplifiedSaleInvoiceDTO
	) => {
		mutate({
			...values,
		});
	};

	return {
		onUpdateSimplifiedSaleInvoice,
		UpdateSimplifiedSaleInvoiceForm,
		isUpdatingSimplifiedSaleInvoice: isPending,
	};
};
