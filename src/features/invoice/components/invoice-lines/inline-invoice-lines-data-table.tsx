import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { TCreateSaleTaxInvoiceDTO } from "@/features/invoice/schema/sale-tax-invoice.schema";
import { ShoppingCart, Plus, Package } from "lucide-react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { InvoiceLineRow } from "./invoice-line-row";
import { useMemo } from "react";

export const InlineInvoiceLinesTable = ({
  isSaleInvoice,
}: {
  isSaleInvoice: boolean;
}) => {
  const form = useFormContext<TCreateSaleTaxInvoiceDTO>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "invoice_lines",
  });

  // Watch all invoice lines to check if any require tax exemption fields
  const invoiceLines = useWatch({
    control: form.control,
    name: "invoice_lines",
  });

  // Check if any line has a tax category that requires exemption fields
  const { showExemptionCode, showExemptionReason } = useMemo(() => {
    const hasExemptionCategory = invoiceLines.some(
      (line) =>
        (line.classified_tax_category === "Z" ||
          line.classified_tax_category === "E" ||
          line.classified_tax_category === "O") &&
        isSaleInvoice
    );
    const hasOCategory = invoiceLines.some(
      (line) => line.classified_tax_category === "O" && isSaleInvoice
    );
    return {
      showExemptionCode: hasExemptionCategory,
      showExemptionReason: hasOCategory,
    };
  }, [invoiceLines, isSaleInvoice]);

  const addNewLine = () => {
    append({
      item_id: 0,
      quantity: 1,
      classified_tax_category: undefined as unknown as "Z" | "S" | "E" | "O",
      discount_amount: 0,
      description: undefined,
      price_discount: 0,
      item_price: 0,
      tax_exemption_reason_code: null,
      tax_exemption_reason: null,
    });
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-light-green" />
              <CardTitle>Invoice Line Items</CardTitle>
            </div>
            <CardDescription className="mt-2">
              Add products or services to this invoice
            </CardDescription>
          </div>
          <Button
            type="button"
            onClick={addNewLine}
            className="gap-2"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            Add New Line
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              No invoice lines added yet
            </p>
            <Button type="button" onClick={addNewLine} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Line
            </Button>
          </div>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="min-w-[300px]">Item</TableHead>
                  <TableHead className="min-w-[120px]">
                    Price <span className="text-destructive">*</span>
                  </TableHead>
                  <TableHead className="min-w-[100px]">
                    Quantity <span className="text-destructive">*</span>
                  </TableHead>
                  <TableHead className="min-w-[200px]">
                    Tax Category <span className="text-destructive">*</span>
                  </TableHead>
                  {showExemptionCode && (
                    <TableHead className="min-w-[100px] bg-amber-50/50 dark:bg-amber-800/20">
                      Exemption Code <span className="text-destructive">*</span>
                    </TableHead>
                  )}
                  {showExemptionReason && (
                    <TableHead className="min-w-[200px] bg-amber-50/50 dark:bg-amber-800/20">
                      Exemption Reason{" "}
                      <span className="text-destructive">*</span>
                    </TableHead>
                  )}
                  <TableHead className="min-w-[100px]">Discount</TableHead>

                  <TableHead className="min-w-[120px]">Sub Total</TableHead>
                  <TableHead className="min-w-[120px]">Tax</TableHead>
                  <TableHead className="min-w-[120px]">Total</TableHead>
                  <TableHead className="min-w-[250px]">Description</TableHead>
                  <TableHead className="w-[100px] text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <InvoiceLineRow
                    key={field.id}
                    index={index}
                    onRemove={() => remove(index)}
                    showExemptionCode={showExemptionCode}
                    showExemptionReason={showExemptionReason}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
