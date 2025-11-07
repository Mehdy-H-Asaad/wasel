"use client";
import { FieldValues, Path, UseFormReturn, useWatch } from "react-hook-form";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { PAYMENTS_TYPES } from "../../constants/invoice.constants";
import { TTaxInvoiceLineDTO } from "../../schema/invoice-lines.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Calendar,
  DollarSign,
  CreditCard,
  Building2,
  SaudiRiyal,
} from "lucide-react";
import { calculateInvoiceLines } from "../../utils/calculate-invoice-lines";
import { useGetStocks } from "@/features/stock/hooks/useGetStock";
import { useMemo } from "react";
import { FormatRiyal } from "@/components/common/format-riyal";

type TInvoicePreviewProps<T> = {
  form: UseFormReturn<T extends FieldValues ? T : never>;
};

export const InvoicePreview = <T extends FieldValues>({
  form,
}: TInvoicePreviewProps<T>) => {
  const invoice = form.getValues();
  const { stocks } = useGetStocks();

  const invoiceLines = (useWatch({
    control: form.control,
    name: "invoice_lines" as Path<T extends FieldValues ? T : never>,
  }) || []) as TTaxInvoiceLineDTO[];

  const pricesIncludeTax = useWatch({
    control: form.control,
    name: "prices_include_tax" as Path<T extends FieldValues ? T : never>,
  });

  const stockMap = useMemo(() => {
    const map = new Map<number, string>();
    for (const stock of stocks || []) {
      map.set(Number(stock.id), stock.name);
    }
    return map;
  }, [stocks]);

  const invoiceLinesWithCalculations = invoiceLines.map((line) => {
    const { lineExtensionAmount, taxAmount, roundingAmount } =
      calculateInvoiceLines(
        line,
        line.classified_tax_category || "S",
        pricesIncludeTax || false
      );
    return {
      ...line,
      item_name: stockMap.get(line.item_id || 0),
      line_extension_amount: lineExtensionAmount,
      tax_amount: taxAmount,
      rounding_amount: roundingAmount,
    };
  });

  const total = invoiceLinesWithCalculations
    .reduce((acc, curr) => acc + (curr.rounding_amount || 0), 0)
    .toFixed(2);
  return (
    <Card className="border-2">
      <CardContent className="p-8 space-y-8">
        {/* Invoice Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-bold text-4xl mb-2 text-light-green">
              {invoice.invoice_type === "0100000"
                ? "Sale Tax Invoice"
                : "Simplified Sale Tax Invoice"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Preview your invoice before submission
            </p>
          </div>
          <div className="text-light-green font-bold text-sm border-2 border-light-green py-2 px-6 rounded-full bg-light-green/5">
            {invoice.invoice_type === "0100000"
              ? "Sale Tax Invoice"
              : "Simplified Tax Invoice"}
          </div>
        </div>
        <Separator />

        {/* Invoice Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1 - Client Information */}
          <Card className="bg-muted/30">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-light-green" />
                <CardTitle className="text-sm">Client Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="text-muted-foreground text-xs">Issued for</div>
                <div className="font-semibold">Sami Jneidy</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">
                  Invoice Type
                </div>
                <div className="font-semibold">
                  {invoice.invoice_type === "0100000"
                    ? "Tax Invoice"
                    : "Simplified Tax Invoice"}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">
                  VAT Document
                </div>
                <div className="font-semibold">
                  {invoice.invoice_type_code === "381"
                    ? "Credit Note"
                    : invoice.invoice_type_code === "383"
                    ? "Debit Note"
                    : "Tax Invoice"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Column 2 - Payment Information */}
          <Card className="bg-muted/30">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-light-green" />
                <CardTitle className="text-sm">Payment Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="text-muted-foreground text-xs">
                  Payment Method
                </div>
                <div className="font-semibold">
                  {
                    PAYMENTS_TYPES.find(
                      (payment) =>
                        payment.value.toString() ===
                        invoice.payment_means_code.toString()
                    )?.label
                  }
                </div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Currency</div>
                <div className="font-semibold">
                  <SaudiRiyal className="h-4 w-4" />
                </div>
              </div>

              <div>
                <div className="text-muted-foreground text-xs">
                  Delivery Date
                </div>
                <div className="font-semibold">
                  {invoice.actual_delivery_date || "N/A"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Column 3 - Date Information */}
          <Card className="bg-muted/30">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-light-green" />
                <CardTitle className="text-sm">Invoice Dates</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="text-muted-foreground text-xs">Issue Date</div>
                <div className="font-semibold">{invoice.issue_date}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs">Issue Time</div>
                <div className="font-semibold">{invoice.issue_time}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Line Items Table */}
        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-light-green" />
            Invoice Line Items
          </h3>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="min-w-[100px]">Item</TableHead>
                  <TableHead className="min-w-[100px]">
                    Price <span className="text-destructive">*</span>
                  </TableHead>
                  <TableHead className="min-w-[100px]">
                    Quantity <span className="text-destructive">*</span>
                  </TableHead>
                  <TableHead className="min-w-[100px]">
                    Tax Category <span className="text-destructive">*</span>
                  </TableHead>
                  <TableHead className="min-w-[100px]">Discount</TableHead>
                  <TableHead className="min-w-[100px]">Sub Total</TableHead>
                  <TableHead className="min-w-[120px]">Tax</TableHead>
                  <TableHead className="min-w-[100px]">Total</TableHead>
                  <TableHead className="min-w-[100px]">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoiceLinesWithCalculations.length > 0 ? (
                  invoiceLinesWithCalculations.map((invoiceLine) => (
                    <TableRow key={invoiceLine.item_id}>
                      <TableCell className="font-medium">
                        {invoiceLine.item_name}
                      </TableCell>
                      <TableCell>
                        <FormatRiyal value={invoiceLine.item_price} />{" "}
                      </TableCell>
                      <TableCell>{invoiceLine.quantity}</TableCell>
                      <TableCell>
                        {invoiceLine.classified_tax_category}
                      </TableCell>
                      <TableCell>
                        <FormatRiyal value={invoiceLine.discount_amount || 0} />
                      </TableCell>
                      <TableCell>
                        <FormatRiyal
                          value={invoiceLine.line_extension_amount}
                        />
                      </TableCell>
                      <TableCell>
                        <FormatRiyal value={invoiceLine.tax_amount} />{" "}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        <FormatRiyal value={invoiceLine.rounding_amount} />
                      </TableCell>
                      <TableCell>{invoiceLine.description}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground py-8"
                    >
                      No line items added yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-light-green/10">
                  <TableCell colSpan={8} className="font-bold text-lg">
                    Grand Total
                  </TableCell>
                  <TableCell className="text-right font-bold text-lg text-light-green">
                    {total} SAR
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Financial Summary */}
          <Card className="bg-light-green/5 border-light-green/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-light-green" />
                <CardTitle className="text-base">Financial Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Subtotal Before Tax
                </span>
                <span className="font-semibold">
                  {invoiceLinesWithCalculations
                    .reduce(
                      (acc, curr) => acc + (curr.line_extension_amount || 0),
                      0
                    )
                    .toFixed(2)}{" "}
                  SAR
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {/* Tax Amount ({invoice.tax_rate}%) */}
                </span>
                <span className="font-semibold">
                  {invoiceLinesWithCalculations
                    .reduce((acc, curr) => acc + (curr.tax_amount || 0), 0)
                    .toFixed(2)}{" "}
                  SAR
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-bold">Total Amount</span>
                <span className="font-bold text-light-green text-lg">
                  {total} SAR
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          {invoice.note ? (
            <Card className="bg-muted/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-light-green" />
                  <CardTitle className="text-base">Additional Notes</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {invoice.note}
                </p>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};
