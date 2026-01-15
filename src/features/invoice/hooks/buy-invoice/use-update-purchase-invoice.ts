"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { PURCHASE_INVOICES } from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TPurchaseInvoiceDTO,
	TUpdatePurchaseInvoiceDTO,
	UpdatePurchaseInvoiceSchema,
} from "../../schema/purchase-invoice.schema";
import { useRouter } from "next/navigation";

export const useUpdatePurchaseInvoice = ({
	invoiceId,
}: {
	invoiceId: string;
}) => {
	const router = useRouter();
	const { mutate, isPending } = useApiMutation<
		TPurchaseInvoiceDTO,
		TUpdatePurchaseInvoiceDTO
	>({
		axiosRequestMethod: "put",
		queryKey: [PURCHASE_INVOICES],
		requestURL: `/${PURCHASE_INVOICES}/${invoiceId}`,
		successMsg: `Purchase Invoice ${CREATION_SUCCESS_MESSAGE}`,
		axiosType: "private",
		onSuccess: () => {
			router.push(`/admin/purchases/purchase-invoices`);
		},
	});

	const UpdatePurchaseInvoiceForm = useForm<TUpdatePurchaseInvoiceDTO>({
		resolver: zodResolver(UpdatePurchaseInvoiceSchema),
		mode: "onChange",
	});

	const onUpdatePurchaseInvoice = (values: TUpdatePurchaseInvoiceDTO) => {
		mutate({
			...values,
		});
	};

	return {
		onUpdatePurchaseInvoice,
		UpdatePurchaseInvoiceForm,
		isUpdatingPurchaseInvoice: isPending,
	};
};
