"use client";
import { Form } from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { MainButton } from "@/components/common/MainButton";
import { InvoiceLinesDataTable } from "../invoice-lines/invoice-line-data-table/InvoiceLineDataTable";
import { InvoiceDetails } from "../../invoice-details/InvoiceDetails";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { useCreateSimplifiedTaxInvoice } from "@/features/invoice/hooks/simplified-tax-invoice/useCreateSimplifiedTaxInvoice";
import { CreateSimplifiedTaxInvoiceOptions } from "./CreateSimplifiedTaxInvoiceOptions";
import { SimplifiedTaxInvoiceCalculations } from "./SimplifiedTaxInvoiceCalculations";
import { useTaxInvoiceLineStore } from "@/features/invoice/store/tax-invoice-line.store";
export const CreateSimplifiedTaxInvoice = () => {
	const [isPreviewing, setIsPreviewing] = useState<boolean>(false);

	const {
		CreateSimplifiedTaxInvoiceForm,
		isCreatingSimplifiedTaxInvoice,
		onCreateSimplifiedTaxInvoice,
	} = useCreateSimplifiedTaxInvoice();

	const { invoiceLines } = useTaxInvoiceLineStore();

	const handlePreview = () => {
		setIsPreviewing(!isPreviewing);
		window.scrollTo({ top: 0 });
	};

	useEffect(() => {
		CreateSimplifiedTaxInvoiceForm.setValue("invoiceLines", invoiceLines);
	}, [invoiceLines, CreateSimplifiedTaxInvoiceForm]);

	return (
		<Form {...CreateSimplifiedTaxInvoiceForm}>
			<form
				onSubmit={CreateSimplifiedTaxInvoiceForm.handleSubmit(
					onCreateSimplifiedTaxInvoice
				)}
				className="flex flex-col gap-10 py-10"
			>
				{!isPreviewing ? (
					<>
						<div className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-4">
								<FaFileInvoiceDollar size={40} />
								<div className="font-bold text-5xl">
									Create Simplified Tax Invoice
								</div>
							</div>

							<div className="text-light-green font-bold text-lg border border-light-green py-1 px-4 rounded-full">
								Simplified Tax Invoice
							</div>
						</div>

						<div className="flex flex-col gap-10 ">
							<CreateSimplifiedTaxInvoiceOptions />
							<InvoiceLinesDataTable />
							<SimplifiedTaxInvoiceCalculations />
							<div className="flex items-center gap-4 self-end">
								<MainButton onClick={handlePreview}>Preview Invoice</MainButton>
							</div>
						</div>
					</>
				) : (
					<>
						<InvoiceDetails form={CreateSimplifiedTaxInvoiceForm} />
						<div className="flex items-center gap-4 self-end">
							<MainButton onClick={handlePreview}>Edit Invoice</MainButton>
							<MainButton
								type="submit"
								className="ml-auto w-fit"
								onClick={() =>
									console.log(CreateSimplifiedTaxInvoiceForm.getValues())
								}
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
