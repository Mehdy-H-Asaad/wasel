"use client";
import { useSearchParams } from "next/navigation";
import { DataTable } from "@/components/common/DataTable";
import { SaleInvoicesColumns } from "./SaleInvoicesColumns";
import { useGetSaleInvoices } from "@/features/invoice/hooks/sale-invoice/useGetSalenvoices";
import Link from "next/link";
import { MainButton } from "@/components/common/MainButton";
import { SaleInvoiceFilters } from "./SaleInvoiceFilters";
import { Plus } from "lucide-react";
import { TInvoiceFilters } from "@/features/invoice/hooks/sale-invoice/useGetSalenvoices";
// import { usePaginationParams } from "@/shared/hooks/usePaginationParams";
import { useFilterParams } from "@/shared/hooks/useFilterParams";

export const SaleInvoicesDataTable = ({
	invoiceType,
}: {
	invoiceType: "tax" | "simplified-tax";
}) => {
	const searchParams = useSearchParams();

	// Filter management
	const { updateFilters: updateFilterParams, clearFilters } =
		useFilterParams<TInvoiceFilters>();

	const filters: TInvoiceFilters = {
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
		invoice_number: searchParams.get("invoice_number") ?? undefined,
		customer_id: searchParams.get("customer_id") ?? undefined,
	};

	const updateFilters = (newFilters: TInvoiceFilters) => {
		updateFilterParams(newFilters, { resetPage: true });
	};

	const handleSearchableFieldChange = (newSearchableField: string) => {
		updateFilters({ invoice_number: newSearchableField });
	};

	const { metaData, invoices, isLoadingInvoices } = useGetSaleInvoices({
		documentType: "INVOICE",
		invoiceType,
		filters,
	});

	return (
		<DataTable
			columns={SaleInvoicesColumns}
			data={invoices || []}
			pageCount={metaData.total_pages}
			searchablePlaceholder="Invoice Number"
			manualPagination={true}
			setSearchableField={handleSearchableFieldChange}
			isLoading={isLoadingInvoices}
			totalCount={metaData.total_pages}
			filters={
				<SaleInvoiceFilters
					filters={filters}
					onFiltersChange={updateFilters}
					onClearFilters={clearFilters}
				/>
			}
		>
			<Link
				href={`/admin/sales/invoices/create-${
					invoiceType === "tax" ? "tax" : "cash"
				}-invoice`}
			>
				<MainButton>
					<Plus className="h-4 w-4" />
					Create {invoiceType === "tax" ? "Sale" : "Cash"} Invoice
				</MainButton>
			</Link>
		</DataTable>
	);
};
