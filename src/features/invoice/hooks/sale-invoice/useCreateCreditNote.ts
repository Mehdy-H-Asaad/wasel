"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { SALE_INVOICES } from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CreateCreditNoteSchema,
	TCreateCreditNoteDTO,
	TCreditNoteDTO,
} from "../../schema/credit-note.schema";
import { useRouter } from "next/navigation";
import { TInvoiceDTO } from "../../schema/invoice.schema";
import { useEffect } from "react";

export const useCreateCreditNote = ({
	invoice,
}: {
	invoice: TInvoiceDTO | undefined;
}) => {
	const router = useRouter();

	const { mutate, isPending } = useApiMutation<
		TCreditNoteDTO,
		TCreateCreditNoteDTO
	>({
		axiosRequestMethod: "post",
		queryKey: [SALE_INVOICES],
		requestURL: `/${SALE_INVOICES}`,
		successMsg: `Credit Note ${CREATION_SUCCESS_MESSAGE}`,
		axiosType: "private",
		onSuccess: () => {
			router.push(`/admin/sales/invoices`);
		},
	});

	const CreateCreditNoteForm = useForm<TCreateCreditNoteDTO>({
		resolver: zodResolver(CreateCreditNoteSchema),
		mode: "onChange",
		// defaultValues,
	});

	useEffect(() => {
		if (invoice) {
			CreateCreditNoteForm.reset({
				...invoice,
				customer_id: invoice.customer.id,
				invoice_lines: invoice.invoice_lines.map(line => ({
					...line,
					item_id: line.item_id || undefined,
					tax_exemption_reason_code: line.tax_exemption_reason_code || null,
					tax_exemption_reason: line.tax_exemption_reason || null,
				})),
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [invoice]);

	const onCreateCreditNote = (values: TCreateCreditNoteDTO) => {
		mutate(values);
	};

	return {
		onCreateCreditNote,
		CreateCreditNoteForm,
		isCreatingCreditNote: isPending,
		originalInvoice: invoice,
	};
};
