"use client";
import { DataTable } from "@/components/common/DataTable";
import { InvoiceLinesColumns } from "./InvoiceLineColumns";
import { TCreateTaxInvoiceDTO } from "@/features/invoice/schema/tax-invoice.schema";
import { UseFormReturn } from "react-hook-form";
import { CreateInvoiceLine } from "../create-invoice-line/CreateInvoiceLine";
import { useInvoiceLineStore } from "@/features/invoice/store/invoice-line.store";
import { useEffect } from "react";

export type TCreateTaxInvoiceLines = {
	form: UseFormReturn<TCreateTaxInvoiceDTO>;
};

export const InvoiceLinesDataTable = () => {
	const { invoiceLinesTable } = useInvoiceLineStore();

	useEffect(() => {
		console.log(invoiceLinesTable);
	}, [invoiceLinesTable]);

	return (
		<div className="flex flex-col dark:bg-main-black p-8 rounded-xl bg-[#fafafa]">
			<div className="text-2xl font-bold">Tax Invoice Lines</div>
			<div className="flex flex-col gap-4 py-8 rounded-2xl">
				<DataTable
					columns={InvoiceLinesColumns}
					data={invoiceLinesTable || []}
					searchableField="item_name"
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
