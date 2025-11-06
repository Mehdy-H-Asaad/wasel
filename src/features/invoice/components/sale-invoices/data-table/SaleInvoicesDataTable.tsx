"use client";
import { DataTable } from "@/components/common/DataTable";
import { SaleInvoicesColumns } from "./SaleInvoicesColumns";
import { CreateSaleInvoiceDialog } from "../CreateSaleInvoiceDialog";
import { useGetSaleInvoices } from "@/features/invoice/hooks/sale-invoice/useGetSalenvoices";

export const SaleInvoicesDataTable = () => {
  const { metaData, invoices, isLoadingInvoices } = useGetSaleInvoices({
    documentType: "invoice",
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
    >
      <CreateSaleInvoiceDialog />
    </DataTable>
  );
};
