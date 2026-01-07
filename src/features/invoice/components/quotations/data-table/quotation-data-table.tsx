"use client";
import { DataTable } from "@/components/common/DataTable";
import { QuotationColumns } from "./quotation-columns";
import {
	TInvoiceFilters,
	useGetSaleInvoices,
} from "@/features/invoice/hooks/sale-invoice/useGetSalenvoices";
import Link from "next/link";
import { MainButton } from "@/components/common/MainButton";
import { Plus } from "lucide-react";
import { QuotationsFilters } from "./qutations-filters";
import { useFilterParams } from "@/shared/hooks/useFilterParams";
import { useSearchParams } from "next/navigation";

export const QuotationsDataTable = () => {
	const searchParams = useSearchParams();
	const { updateFilters: updateFilterParams, clearFilters } =
		useFilterParams<TInvoiceFilters>();

	const filters: TInvoiceFilters = {
		invoice_number: searchParams.get("invoice_number") ?? undefined,
		customer_id: searchParams.get("customer_id") ?? undefined,
		invoice_type_code:
			(searchParams.get(
				"invoice_type_code"
			) as TInvoiceFilters["invoice_type_code"]) ?? undefined,
		payment_means_code:
			(searchParams.get(
				"payment_means_code"
			) as TInvoiceFilters["payment_means_code"]) ?? undefined,
		classified_tax_category:
			(searchParams.get(
				"classified_tax_category"
			) as TInvoiceFilters["classified_tax_category"]) ?? undefined,
		issue_date_range_from:
			searchParams.get("issue_date_range_from") ?? undefined,
		issue_date_range_to: searchParams.get("issue_date_range_to") ?? undefined,
	};

	const { metaData, invoices, isLoadingInvoices } = useGetSaleInvoices({
		documentType: "QUOTATION",
		invoiceType: "tax",
		filters,
	});

	const clearAllFilters = () => {
		clearFilters();
	};

	const updateFilters = (newFilters: TInvoiceFilters) => {
		updateFilterParams(newFilters, { resetPage: true });
	};

	const handleSearchableFieldChange = (newSearchableField: string) => {
		updateFilters({ ...filters, invoice_number: newSearchableField });
	};

	return (
		<DataTable
			columns={QuotationColumns}
			data={invoices || []}
			pageCount={metaData.total_pages}
			searchablePlaceholder="Quotation Number"
			manualPagination={true}
			setSearchableField={handleSearchableFieldChange}
			isLoading={isLoadingInvoices}
			totalCount={metaData.total_pages}
			filters={
				<QuotationsFilters
					filters={filters}
					onFiltersChange={updateFilters}
					onClearFilters={clearAllFilters}
				/>
			}
		>
			<Link href={"/admin/sales/quotations/create-quotation"}>
				<MainButton>
					<Plus className="h-4 w-4" />
					Create Quotation
				</MainButton>
			</Link>
		</DataTable>
	);
};
