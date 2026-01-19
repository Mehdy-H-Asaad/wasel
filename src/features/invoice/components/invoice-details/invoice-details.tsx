"use client";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { PAYMENTS_TYPES } from "../../constants/invoice.constants";
import { useGetSingleSaleInvoice } from "../../hooks/sale-invoice/use-get-single-sale-invoice";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, SaudiRiyal } from "lucide-react";
import { FormatRiyal } from "@/components/common/format-riyal";
import { Button } from "@/components/ui/button";
import { useGetSinglePurchaseInvoice } from "../../hooks/buy-invoice/use-get-single-purchase-invoice";

type InvoiceDetailsProps = {
  type: "sale" | "purchase";
};

export const InvoiceDetails = ({ type }: InvoiceDetailsProps) => {
  const { id } = useParams<{ id: string }>();

  // Conditionally fetch based on invoice type
  const saleQuery = useGetSingleSaleInvoice({
    id,
    enabled: type === "sale" && !!id
  });
  const purchaseQuery = useGetSinglePurchaseInvoice({
    id,
    enabled: type === "purchase" && !!id
  });

  const invoice = type === "sale" ? saleQuery.invoice : purchaseQuery.purchaseInvoice;
  const isLoadingInvoice = type === "sale" ? saleQuery.isLoadingInvoice : purchaseQuery.isLoadingPurchaseInvoice;

  const router = useRouter();

  if (isLoadingInvoice) {
    return <div>
      <Skeleton className="w-full h-[600px]" />
    </div>
  }


  if (!invoice) return null;


  const total = invoice.invoice_lines
    .reduce(
      (acc, curr) =>
        parseFloat(acc.toString()) +
        parseFloat(curr.rounding_amount.toString()),
      0
    )
    .toFixed(2);

  return (
    <>
      <Button variant="outline" className="w-fit" onClick={() => router.back()}>
        <ArrowLeft className="size-4" />
        Back
      </Button>
      <div className="flex flex-col gap-y-10 dark:bg-main-black p-8 rounded-xl bg-">
        <div className="flex items-center justify-between ">
          <div className="font-bold text-5xl">
            {type === "sale"
              ? (invoice.invoice_type === "0100000"
                ? "Sale Tax Invoice"
                : "Simplified Sale Tax Invoice")
              : "Purchase Invoice"
            }
          </div>
          <div className="text-light-green font-bold text-lg border border-light-green py-1 px-4 rounded-full">
            Tax Invoice
          </div>
        </div>
        <hr />

        <div className="grid grid-cols-3 gap-y-10 gap-x-20">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-main-gray">
                {type === "sale" ? "Issued for: " : "Issued from: "}
              </div>
              <div>
                {type === "sale"
                  ? (invoice.customer ? invoice.customer.registration_name : "Customer")
                  : (invoice.supplier ? invoice.supplier.registration_name : "Supplier")
                }
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-main-gray">Invoice Type: </div>
              <div>
                {invoice.invoice_type === "0100000"
                  ? "Tax Invoice"
                  : "Cash Invoice"}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-main-gray">VAT Document: </div>
              <div>
                {invoice.invoice_type_code === "381"
                  ? "Credit Note"
                  : invoice.invoice_type_code === "383"
                    ? "Debit Note"
                    : "Tax Invoice"}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-main-gray">Payment Type: </div>
              <div>
                {
                  PAYMENTS_TYPES.find(
                    (payment) =>
                      payment.value.toString() ===
                      invoice.payment_means_code.toString()
                  )?.label
                }
              </div>
            </div>
            {/* <div className="flex items-center justify-between">
            <div className="text-main-gray">Tax Category: </div>
            <div>
              {invoice.classified_tax_category === "Z"
                ? "Zero Tax"
                : invoice.classified_tax_category === "S"
                ? "Applicable Tax"
                : "NA"}
            </div>
          </div> */}
            <div className="flex items-center justify-between">
              <div className="text-main-gray">Delivery Date: </div>
              <div>{invoice.actual_delivery_date}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-main-gray">Currency: </div>
              {/* <div>SAR</div> */}
              <SaudiRiyal />
            </div>
          </div>


          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-main-gray">Issue Date: </div>
              <div>{invoice.issue_date}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-main-gray">Issue Time: </div>
              <div>{invoice.issue_time}</div>
            </div>

          </div>
        </div>

        <hr />

        <Table className="mt-8 border">
          <TableCaption>A list of your invoice lines.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Item</TableHead>
              <TableHead>Item Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Tax Category</TableHead>
              <TableHead>Subtotal Before Tax</TableHead>

              <TableHead>Tax Amount</TableHead>

              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.invoice_lines.map((invoiceLine, index) => (
              <TableRow key={`invoice-line-${invoiceLine.item_id}-${index}`}>
                <TableCell className="font-medium">
                  {invoiceLine.item.name}
                </TableCell>
                <TableCell><FormatRiyal value={invoiceLine.item_price} /></TableCell>
                <TableCell><FormatRiyal value={invoiceLine.quantity} /></TableCell>
                <TableCell><FormatRiyal value={invoiceLine.discount_amount ?? 0} /></TableCell>

                <TableCell>{invoiceLine.classified_tax_category === "Z" ? "Zero rated goods (0%)"
                  : invoiceLine.classified_tax_category === "S" ? "VAT on Sales (15%)" :
                    invoiceLine.classified_tax_category === "E" ?
                      "Exempt (0%)" : "Services outside scope of VAT (0%)"}
                </TableCell>
                <TableCell><FormatRiyal value={invoiceLine.line_extension_amount} /></TableCell>

                <TableCell><FormatRiyal value={invoiceLine.tax_amount} /></TableCell>
                <TableCell className="text-right">
                  <FormatRiyal value={invoiceLine.rounding_amount} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>Total</TableCell>
              <TableCell className="text-right"> <FormatRiyal value={Number(total)} /></TableCell>
            </TableRow>
          </TableFooter>

        </Table>

        {invoice.note ? (
          <div className="border p-8 rounded-2xl">
            <span className="font-bold text-lg">Note:</span> {invoice.note}
          </div>
        ) : null}
        <div className="flex flex-col gap-4">
          <div className="font-bold text-3xl">Summary</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div>Discount Amount: </div>
              {/* <div>SAR {invoice.discount_amount}</div> */}
              <FormatRiyal value={invoice.discount_amount ?? 0} />
            </div>
            <div className="flex items-center gap-2">
              <div>Taxable Amount: </div>
              <FormatRiyal value={invoice.taxable_amount ?? 0} />
            </div>
            <div className="flex items-center gap-2">
              <div>Subtotal Before Tax: </div>
              <FormatRiyal value={invoice.line_extension_amount ?? 0} />
            </div>
            <div className="flex items-center gap-2">
              <div>Tax Amount: </div>
              <FormatRiyal value={invoice.tax_amount ?? 0} />
            </div>
            <div className="flex items-center gap-2">
              <div>Inclusive Amount: </div>
              <FormatRiyal value={invoice.tax_inclusive_amount ?? 0} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
