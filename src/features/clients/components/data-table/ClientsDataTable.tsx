"use client";
import { DataTable } from "@/components/common/DataTable";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { LIMIT } from "@/shared/data/constants";
import { useGetClients } from "../../hooks/useGetClients";
import { ClientsColumns } from "./ClientsColumns";
import { CreateClient } from "../CreateClient";
import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";

export const ClientsDataTable = () => {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: LIMIT,
	});

	const { metaData, clients, isLoadingClients } = useGetClients();

	return false ? (
		<DataTableSkeleton />
	) : (
		<div className=" border-3 p-10 rounded-lg border-[#171717] dark:bg-main-black">
			<DataTable
				columns={ClientsColumns}
				data={clients || []}
				isLoading={isLoadingClients}
				pageCount={metaData.total_pages}
				pagination={pagination}
				searchableField="registration_name"
				searchablePlaceholder="Compnay - Client"
				setPagination={setPagination}
				skeletonRows={10}
			>
				<CreateClient />
			</DataTable>
		</div>
	);
};
