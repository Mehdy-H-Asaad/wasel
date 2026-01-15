"use client";
import { Form } from "@/components/ui/form";
import React from "react";
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
		originalInvoice,
	} = useCreateCreditNote({ invoice });

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
		<div className=" space-y-6" key={originalInvoice?.id || "new"}>
			<Form {...CreateCreditNoteForm}>
				<form
					onSubmit={CreateCreditNoteForm.handleSubmit(onCreateCreditNote)}
					className="flex flex-col gap-6"
				>
					<CreditNoteOptions />
					<InlineInvoiceLinesTable isSaleInvoice />
					<Card className="border-2 ">
						<CardContent className="py-4">
							<div className="flex items-center justify-between gap-4">
								<p className="text-sm text-muted-foreground">
									Complete all required fields to create your credit note
								</p>
								<MainButton
									type="submit"
									onClick={() => {
										console.log(CreateCreditNoteForm.getValues());
									}}
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
