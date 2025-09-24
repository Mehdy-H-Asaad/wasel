"use client";
import { DataTable } from "@/components/common/DataTable";
import { useGetInvoices } from "../../hooks/useGetInvoices";
import { InvoicesColumns } from "./InvoicesColumns";
import { CreateInvoiceDialog } from "../create-invoice/CreateInvoiceDialog";

export const InvoicesDataTable = () => {
	const { metaData, invoices, isLoadingInvoices } = useGetInvoices();

	return (
		<DataTable
			columns={InvoicesColumns}
			data={invoices || []}
			pageCount={metaData.total_pages}
			searchablePlaceholder="Invoice Number"
			manualPagination={true}
			setSearchableField={() => {}}
			isLoading={isLoadingInvoices}
			totalCount={metaData.total_pages}
		>
			<CreateInvoiceDialog />
		</DataTable>
	);
};
