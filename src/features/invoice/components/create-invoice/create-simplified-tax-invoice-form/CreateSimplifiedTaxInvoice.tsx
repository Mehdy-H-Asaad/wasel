"use client";
import { Form } from "@/components/ui/form";
import React, { useState } from "react";
import { MainButton } from "@/components/common/MainButton";
import { CreateSimplifiedTaxInvoiceOptions } from "./CreateSimplifiedTaxInvoiceOptions";
import { InvoiceLinesDataTable } from "../invoice-lines/invoice-line-data-table/InvoiceLineDataTable";
import { InvoicePreview } from "../../invoice-preview/invoice-preview";
import { useCreateSimplifiedTaxInvoice } from "@/features/invoice/hooks/simplified-tax-invoice/useCreateSimplifiedTaxInvoice";
export const CreateSimplifiedTaxInvoice = () => {
	const [isPreviewing, setIsPreviewing] = useState<boolean>(false);

	const {
		CreateSimplifiedTaxInvoiceForm,
		isCreatingSimplifiedTaxInvoice,
		onCreateSimplifiedTaxInvoice,
	} = useCreateSimplifiedTaxInvoice();

	const handlePreview = () => {
		setIsPreviewing(!isPreviewing);
		window.scrollTo({ top: 0 });
	};

	return (
		<Form {...CreateSimplifiedTaxInvoiceForm}>
			<form
				onSubmit={CreateSimplifiedTaxInvoiceForm.handleSubmit(
					onCreateSimplifiedTaxInvoice
				)}
				className="flex flex-col gap-4"
			>
				{!isPreviewing ? (
					<>
						<div className="flex flex-col gap-10 ">
							<CreateSimplifiedTaxInvoiceOptions />
							<InvoiceLinesDataTable />
							<div className="flex items-center gap-4 self-end">
								<MainButton onClick={handlePreview}>Preview Invoice</MainButton>
							</div>
						</div>
					</>
				) : (
					<>
						<InvoicePreview form={CreateSimplifiedTaxInvoiceForm} />
						<div className="flex items-center gap-4 self-end">
							<MainButton onClick={handlePreview}>Edit Invoice</MainButton>
							<MainButton
								type="submit"
								className="ml-auto w-fit"
								disabled={
									isCreatingSimplifiedTaxInvoice ||
									!CreateSimplifiedTaxInvoiceForm.formState.isValid
								}
							>
								{isCreatingSimplifiedTaxInvoice
									? "Creating Invoice..."
									: "Create Simplified Tax Invoice"}
							</MainButton>
						</div>
					</>
				)}
			</form>
		</Form>
	);
};
