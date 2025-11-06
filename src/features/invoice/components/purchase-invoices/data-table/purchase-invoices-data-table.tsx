"use client";
import { DataTable } from "@/components/common/DataTable";
import { useGetPurchaseInvoices } from "../../../hooks/buy-invoice/use-get-purchase-invoices";
import { PurchaseInvoicesColumns } from "./purchase-invoices-columns";
import { MainButton } from "@/components/common/MainButton";
import Link from "next/link";
// import { CreateBuyInvoiceDialog } from "../create-buy-invoice/CreateBuyInvoiceDialog";

export const PurchaseInvoicesDataTable = () => {
  const { metaData, purchaseInvoices, isLoadingPurchaseInvoices } =
    useGetPurchaseInvoices();

  return (
    <DataTable
      columns={PurchaseInvoicesColumns}
      data={purchaseInvoices || []}
      pageCount={metaData.total_pages}
      searchablePlaceholder="Invoice Number"
      manualPagination={true}
      setSearchableField={() => {}}
      isLoading={isLoadingPurchaseInvoices}
      totalCount={metaData.total_pages}
    >
      <Link href="/admin/purchases/purchase-invoices/create-purchase-invoice">
        <MainButton>Create Purchase Invoice</MainButton>
      </Link>
    </DataTable>
  );
};
