"use client";
import { Form } from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { useCreateTaxInvoice } from "../../../hooks/tax-invoice/useCreateTaxInvoice";
import { MainButton } from "@/components/common/MainButton";
import { CreateTaxInvoiceOptions } from "./CreateTaxInvoiceOptions";
import { InvoiceLinesDataTable } from "../invoice-lines/invoice-line-data-table/InvoiceLineDataTable";
import { TaxInvoiceCalculations } from "./TaxInvoiceCalculations";
import { InvoiceDetails } from "../../invoice-details/InvoiceDetails";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { useTaxInvoiceLineStore } from "@/features/invoice/store/tax-invoice-line.store";
export const CreateTaxInvoice = () => {
	const [isPreviewing, setIsPreviewing] = useState<boolean>(false);

	const { CreateTaxInvoiceForm, isCreatingTaxInvoice, onCreateTaxInvoice } =
		useCreateTaxInvoice();
	const { invoiceLines } = useTaxInvoiceLineStore();

	const handlePreview = () => {
		setIsPreviewing(!isPreviewing);
		window.scrollTo({ top: 0 });
	};

	useEffect(() => {
		CreateTaxInvoiceForm.setValue("invoiceLines", invoiceLines);
	}, [invoiceLines, CreateTaxInvoiceForm]);

	return (
		<Form {...CreateTaxInvoiceForm}>
			<form
				onSubmit={CreateTaxInvoiceForm.handleSubmit(onCreateTaxInvoice)}
				className="flex flex-col gap-10 py-10"
			>
				{!isPreviewing ? (
					<>
						<div className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-4">
								<FaFileInvoiceDollar size={40} />
								<div className="font-bold text-5xl">Create Tax Invoice</div>
							</div>

							<div className="text-light-green font-bold text-lg border border-light-green py-1 px-4 rounded-full">
								Tax Invoice
							</div>
						</div>

						<div className="flex flex-col gap-10 ">
							<CreateTaxInvoiceOptions />
							<InvoiceLinesDataTable />
							<TaxInvoiceCalculations />
							<div className="flex items-center gap-4 self-end">
								<MainButton onClick={handlePreview}>Preview Invoice</MainButton>
							</div>
						</div>
					</>
				) : (
					<>
						<InvoiceDetails form={CreateTaxInvoiceForm} />
						<div className="flex items-center gap-4 self-end">
							<MainButton onClick={handlePreview}>Edit Invoice</MainButton>
							<MainButton
								type="submit"
								className="ml-auto w-fit"
								onClick={() => console.log(CreateTaxInvoiceForm.getValues())}
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
