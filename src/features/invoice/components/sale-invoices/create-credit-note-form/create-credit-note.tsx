"use client";
import { Form } from "@/components/ui/form";
import React, { useEffect } from "react";
import { useCreateCreditNote } from "../../../hooks/sale-invoice/useCreateCreditNote";
import { MainButton } from "@/components/common/MainButton";
import { InlineInvoiceLinesTable } from "../../invoice-lines/inline-invoice-lines-data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
import { CreditNoteOptions } from "./credit-note-options";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSingleSaleInvoice } from "../../../hooks/sale-invoice/use-get-single-sale-invoice";
import { useSearchParams } from "next/navigation";

export const CreateCreditNote = () => {
	const searchParams = useSearchParams();

	const originalInvoiceId = searchParams.get("original_invoice_id");
	const { invoice, isLoadingInvoice } = useGetSingleSaleInvoice({
		id: originalInvoiceId || "",
		enabled: !!originalInvoiceId,
	});

	const {
		CreateCreditNoteForm,
		isCreatingCreditNote,
		onCreateCreditNote,
	} = useCreateCreditNote();

	useEffect(() => {
		if (invoice && originalInvoiceId) {
			CreateCreditNoteForm.reset({
				...invoice,
				invoice_type_code: "381",
				original_invoice_id: originalInvoiceId,
				discount_amount: Number(invoice.discount_amount),
				customer_id: invoice.customer?.id,
				invoice_lines: invoice.invoice_lines.map(line => ({
					...line,
					price_discount: Number(line.price_discount),
					tax_exemption_reason: line.tax_exemption_reason_code
						? line.tax_exemption_reason_code
						: line.tax_exemption_reason,
					tax_exemption_reason_code: line.tax_exemption_reason_code
						? line.tax_exemption_reason_code
						: null,
					classified_tax_category: line.classified_tax_category,
					description: line.description,

					item_id: Number(line.item?.id),
					item_price: Number(line.item_price),
					discount_amount: Number(line.discount_amount),
					quantity: Number(line.quantity),
				})),
			});
		}
	}, [invoice, originalInvoiceId, CreateCreditNoteForm]);



	if (isLoadingInvoice) {
		return (
			<div className="w-full h-full flex items-center flex-col justify-center gap-4">
				<Skeleton className="h-[300px] w-full" />
				<Skeleton className="h-[200px] w-full" />
				<Skeleton className="h-[100px] w-full" />
			</div>
		);
	}




	return (
		<div className=" space-y-6" key={originalInvoiceId || "new"}>
			<Form {...CreateCreditNoteForm}>
				<form
					onSubmit={CreateCreditNoteForm.handleSubmit(onCreateCreditNote)}
					className="flex flex-col gap-6"
				>
					<CreditNoteOptions />
					<InlineInvoiceLinesTable isSaleInvoice isNote />
					<Card className="border-2 ">
						<CardContent className="py-4">
							<div className="flex items-center justify-between gap-4">
								<p className="text-sm text-muted-foreground">
									Complete all required fields to create your credit note
								</p>
								<MainButton
									type="submit"
									className="gap-2"
									isLoading={isCreatingCreditNote}
									loadingText="Creating Credit Note..."
								>
									<Save className="h-4 w-4" />
									Create Credit Note
								</MainButton>
							</div>
						</CardContent>
					</Card>
				</form>
			</Form>
		</div>
	);
};
