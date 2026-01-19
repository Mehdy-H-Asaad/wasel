"use client";
import { DataTable } from "@/components/common/DataTable";
import {
	TPurchaseInvoiceFilters,
	useGetPurchaseInvoices,
} from "../../../hooks/buy-invoice/use-get-purchase-invoices";
import { PurchaseInvoicesColumns } from "./purchase-invoices-columns";
import { MainButton } from "@/components/common/MainButton";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useFilterParams } from "@/shared/hooks/useFilterParams";
import { PurchaseInvoiceFilters } from "./purchase-invoices-filters";
// import { PurchaseInvoiceFilters } from "./purchase-invoice-filters";
// import { CreateBuyInvoiceDialog } from "../create-buy-invoice/CreateBuyInvoiceDialog";

export const PurchaseInvoicesDataTable = ({
	VATDocument,
}: {
	VATDocument: "TAX_INVOICE" | "DEBIT_NOTE" | undefined;
}) => {
	const searchParams = useSearchParams();
	const { updateFilters: updateFilterParams, clearFilters } =
		useFilterParams<TPurchaseInvoiceFilters>();

	const filters: TPurchaseInvoiceFilters = {
		invoice_type_code:
			(searchParams.get(
				"invoice_type_code"
			) as TPurchaseInvoiceFilters["invoice_type_code"]) ?? undefined,
		payment_means_code:
			(searchParams.get(
				"payment_means_code"
			) as TPurchaseInvoiceFilters["payment_means_code"]) ?? undefined,
		classified_tax_category:
			(searchParams.get(
				"classified_tax_category"
			) as TPurchaseInvoiceFilters["classified_tax_category"]) ?? undefined,
		issue_date_range_from:
			(searchParams.get(
				"issue_date_range_from"
			) as TPurchaseInvoiceFilters["issue_date_range_from"]) ?? undefined,
		issue_date_range_to:
			(searchParams.get(
				"issue_date_range_to"
			) as TPurchaseInvoiceFilters["issue_date_range_to"]) ?? undefined,
		invoice_number:
			(searchParams.get(
				"invoice_number"
			) as TPurchaseInvoiceFilters["invoice_number"]) ?? undefined,
	};

	const updateFilters = (newFilters: TPurchaseInvoiceFilters) => {
		updateFilterParams(newFilters);
	};

	const handleSearchableFieldChange = (newSearchableField: string) => {
		updateFilters({ invoice_number: newSearchableField });
	};

	const { metaData, purchaseInvoices, isLoadingPurchaseInvoices } =
		useGetPurchaseInvoices({ filters: { ...filters, invoice_type_code: (VATDocument && (VATDocument === "TAX_INVOICE" ? "388" : VATDocument === "DEBIT_NOTE" ? "383" : undefined)) ?? filters.invoice_type_code } });
	return (
		<DataTable
			columns={PurchaseInvoicesColumns}
			data={purchaseInvoices || []}
			pageCount={metaData.total_pages}
			searchablePlaceholder="Invoice Number"
			manualPagination={true}
			setSearchableField={handleSearchableFieldChange}
			isLoading={isLoadingPurchaseInvoices}
			totalCount={metaData.total_pages}
			filters={
				<PurchaseInvoiceFilters
					filters={filters}
					onFiltersChange={updateFilters}
					onClearFilters={clearFilters}
				/>
			}
		>
			<Link href="/admin/purchases/purchase-invoices/create-purchase-invoice">
				<MainButton>
					<Plus className="h-4 w-4" />
					Create Purchase Invoice
				</MainButton>
			</Link>
		</DataTable>
	);
};
