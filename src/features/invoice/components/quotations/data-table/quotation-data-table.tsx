"use client";
import { DataTable } from "@/components/common/DataTable";
import { QuotationColumns } from "./quotation-columns";
import { useGetSaleInvoices } from "@/features/invoice/hooks/sale-invoice/useGetSalenvoices";
import Link from "next/link";
import { MainButton } from "@/components/common/MainButton";

export const QuotationsDataTable = () => {
  const { metaData, invoices, isLoadingInvoices } = useGetSaleInvoices({
    documentType: "quotation",
    invoiceType: "tax",
  });

  return (
    <DataTable
      columns={QuotationColumns}
      data={invoices || []}
      pageCount={metaData.total_pages}
      searchablePlaceholder="Invoice Number"
      manualPagination={true}
      setSearchableField={() => {}}
      isLoading={isLoadingInvoices}
      totalCount={metaData.total_pages}
    >
      <Link href={"/admin/sales/quotations/create-quotation"}>
        <MainButton>Create Quotation</MainButton>
      </Link>
    </DataTable>
  );
};
