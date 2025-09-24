"use client";
import { Form } from "@/components/ui/form";
import React, { useState } from "react";
import { useCreateTaxInvoice } from "../../../hooks/tax-invoice/useCreateTaxInvoice";
import { MainButton } from "@/components/common/MainButton";
import { CreateTaxInvoiceOptions } from "./CreateTaxInvoiceOptions";
import { InvoiceLinesDataTable } from "../invoice-lines/invoice-line-data-table/InvoiceLineDataTable";
import { InvoicePreview } from "../../invoice-preview/invoice-preview";
export const CreateTaxInvoice = () => {
	const [isPreviewing, setIsPreviewing] = useState<boolean>(false);

	const { CreateTaxInvoiceForm, isCreatingTaxInvoice, onCreateTaxInvoice } =
		useCreateTaxInvoice();

	const handlePreview = () => {
		setIsPreviewing(!isPreviewing);
		window.scrollTo({ top: 0 });
	};

	return (
		<Form {...CreateTaxInvoiceForm}>
			<form
				onSubmit={CreateTaxInvoiceForm.handleSubmit(onCreateTaxInvoice)}
				className="flex flex-col gap-4"
			>
				{!isPreviewing ? (
					<>
						<div className="flex flex-col gap-10 ">
							<CreateTaxInvoiceOptions />
							<InvoiceLinesDataTable />
							<div className="flex items-center gap-4 self-end">
								<MainButton onClick={handlePreview}>Preview Invoice</MainButton>
							</div>
						</div>
					</>
				) : (
					<>
						<InvoicePreview form={CreateTaxInvoiceForm} />
						<div className="flex items-center gap-4 self-end">
							<MainButton onClick={handlePreview}>Edit Invoice</MainButton>
							<MainButton
								type="submit"
								className="ml-auto w-fit"
								disabled={
									isCreatingTaxInvoice ||
									!CreateTaxInvoiceForm.formState.isValid
								}
							>
								{isCreatingTaxInvoice
									? "Creating Invoice..."
									: "Create Tax Invoice"}
							</MainButton>
						</div>
					</>
				)}
			</form>
		</Form>
	);
};
