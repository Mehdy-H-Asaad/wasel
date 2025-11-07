"use client";
import { useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { DataTable } from "@/components/common/DataTable";
import { SaleInvoicesColumns } from "./SaleInvoicesColumns";
import { useGetSaleInvoices } from "@/features/invoice/hooks/sale-invoice/useGetSalenvoices";
import Link from "next/link";
import { MainButton } from "@/components/common/MainButton";
import {
  SaleInvoiceFilters,
  SaleInvoiceFiltersType,
} from "./SaleInvoiceFilters";
import { usePaginationStore } from "@/shared/store/pagination.store";

export const SaleInvoicesDataTable = ({
  invoiceType,
}: {
  invoiceType: "tax" | "simplified-tax";
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { pagination, setPagination } = usePaginationStore();

  // Parse filters from URL search params
  const filters = useMemo<SaleInvoiceFiltersType>(() => {
    const invoiceTypeCode = searchParams.get("invoice_type_code");
    const paymentMeansCode = searchParams.get("payment_means_code");
    const partyIdentificationScheme = searchParams.get(
      "party_identification_scheme"
    );

    return {
      ...(invoiceTypeCode && { invoice_type_code: invoiceTypeCode }),
      ...(paymentMeansCode && { payment_means_code: paymentMeansCode }),
      ...(partyIdentificationScheme && {
        party_identification_scheme: partyIdentificationScheme,
      }),
    };
  }, [searchParams]);

  // Update URL search params when filters change
  const updateFilters = (newFilters: SaleInvoiceFiltersType) => {
    const params = new URLSearchParams(searchParams.toString());

    // Remove filter params if they're undefined
    if (!newFilters.invoice_type_code) {
      params.delete("invoice_type_code");
    } else {
      params.set("invoice_type_code", newFilters.invoice_type_code);
    }

    if (!newFilters.payment_means_code) {
      params.delete("payment_means_code");
    } else {
      params.set("payment_means_code", newFilters.payment_means_code);
    }

    if (!newFilters.party_identification_scheme) {
      params.delete("party_identification_scheme");
    } else {
      params.set(
        "party_identification_scheme",
        newFilters.party_identification_scheme
      );
    }

    // Reset to first page when filters change
    setPagination({ pageIndex: 0, pageSize: pagination.pageSize });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const { metaData, invoices, isLoadingInvoices } = useGetSaleInvoices({
    documentType: "invoice",
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
      setSearchableField={() => {}}
      isLoading={isLoadingInvoices}
      totalCount={metaData.total_pages}
      filters={
        <SaleInvoiceFilters filters={filters} onFiltersChange={updateFilters} />
      }
    >
      <Link
        href={`/admin/sales/invoices/create-${
          invoiceType === "tax" ? "tax" : "cash"
        }-invoice`}
      >
        <MainButton>Create Sale Invoice</MainButton>
      </Link>
    </DataTable>
  );
};
