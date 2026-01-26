"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import {
	SALE_INVOICES,
} from "../../constants/invoice.constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	TSaleTaxInvoiceDTO,
    TUpdateSaleInvoiceStatusDTO,
    UpdateSaleInvoiceStatusSchema,
} from "../../schema/sale-tax-invoice.schema";
import { useRouter } from "next/navigation";
import { EINVOICE_STATUS } from "../../schema/invoice.schema";


export const useUpdateSaleInvoiceStatus = ({
	invoiceId,
}: {
	invoiceId: string;
}) => {
	const router = useRouter();
	const { mutate, isPending } = useApiMutation<
		TSaleTaxInvoiceDTO,
		TUpdateSaleInvoiceStatusDTO
	>({
		axiosRequestMethod: "patch",
		queryKey: [SALE_INVOICES],
		requestURL: `/${SALE_INVOICES}/${invoiceId}/status`,
		successMsg: `Invoice status updated successfully`,
		axiosType: "private",
		onSuccess: () => {
			router.push(`/admin/sales/invoices`);
		},
	});
    
    const UpdateSaleInvoiceStatusForm = useForm<TUpdateSaleInvoiceStatusDTO>({
		resolver: zodResolver(UpdateSaleInvoiceStatusSchema),
		mode: "onChange",
        defaultValues: {
            status: EINVOICE_STATUS.DRAFT,
            send_to_tax_authority: false,
        },
	});

	const onUpdateSaleInvoiceStatus = (values: TUpdateSaleInvoiceStatusDTO) => {
		mutate({
			status: values.status,
			send_to_tax_authority: values.status === EINVOICE_STATUS.ISSUED,
		});
	};

	return {
		UpdateSaleInvoiceStatusForm,
		onUpdateSaleInvoiceStatus,
		isUpdatingSaleInvoiceStatus: isPending,
	};
};
