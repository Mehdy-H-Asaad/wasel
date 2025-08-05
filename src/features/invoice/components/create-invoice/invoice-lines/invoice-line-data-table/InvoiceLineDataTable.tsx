"use client";
import { DataTable } from "@/components/common/DataTable";
import { InvoiceLinesColumns } from "./InvoiceLineColumns";
import { TCreateTaxInvoiceDTO } from "@/features/invoice/schema/tax-invoice.schema";
import { UseFormReturn } from "react-hook-form";
import { useTaxInvoiceLineStore } from "../../../../store/tax-invoice-line.store";
import { CreateInvoiceLine } from "../create-invoice-line/CreateInvoiceLine";

export type TCreateTaxInvoiceLines = {
	form: UseFormReturn<TCreateTaxInvoiceDTO>;
};

export const InvoiceLinesDataTable = () => {
	const { invoiceLines } = useTaxInvoiceLineStore();
	return (
		<div className="flex flex-col gap-4 dark:bg-main-black p-8 rounded-xl bg-white">
			<div className="text-4xl font-bold">Tax Invoice Lines</div>
			<div className="flex flex-col gap-4 border px-8 rounded-2xl">
				<DataTable
					columns={InvoiceLinesColumns}
					data={invoiceLines || []}
					searchableField="Name"
					searchablePlaceholder="Item Name"
					skeletonRows={10}
					manualPagination={false}
				>
					<CreateInvoiceLine />
				</DataTable>
			</div>
		</div>
	);
};
