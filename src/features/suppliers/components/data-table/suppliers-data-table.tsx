"use client";
import { DataTable } from "@/components/common/DataTable";
import { useGetSuppliers } from "../../hooks/use-get-suppliers";
import { SuppliersColumns } from "./suppliers-columns";
import { CreateSupplier } from "../create-supplier/create-supplier";

export const SuppliersDataTable = () => {
	const { suppliers, isLoadingSuppliers } = useGetSuppliers();

	return (
		<DataTable
			columns={SuppliersColumns}
			data={suppliers || []}
			isLoading={isLoadingSuppliers}
			// pageCount={metaData.total_pages}
			setSearchableField={() => {}}
			manualPagination={false}
			// totalCount={metaData.total_rows}
			searchablePlaceholder="Compnay - Supplier"
		>
			<CreateSupplier />
		</DataTable>
	);
};
