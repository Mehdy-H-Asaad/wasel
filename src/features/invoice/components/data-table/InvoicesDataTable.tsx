"use client";
import { DataTable } from "@/components/common/DataTable";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { LIMIT } from "@/shared/data/constants";
import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";
import { useGetInvoices } from "../../hooks/useGetInvoices";
import { TTaxInvoiceDTO } from "../../types/invoice.types";
import { InvoicesColumns } from "./InvoicesColumns";
import { CreateInvoiceDialog } from "../create-invoice/CreateInvoiceDialog";

export const InvoicesDataTable = () => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: LIMIT,
	});

	const { metaData } = useGetInvoices();

	const data: TTaxInvoiceDTO[] = [];

	return false ? (
		<DataTableSkeleton />
	) : (
		<div className=" border-3 p-10 rounded-lg border-[#171717] dark:bg-main-black">
			<DataTable
				columns={InvoicesColumns}
				data={data || []}
				pageCount={metaData.total_pages}
				pagination={pagination}
				searchableField="buyer-company"
				searchablePlaceholder="Compnay - Client"
				setPagination={setPagination}
				skeletonRows={10}
				manualPagination={true}
			>
				<CreateInvoiceDialog />
			</DataTable>
		</div>
	);
};
