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
import { TCreateTaxInvoiceDTO } from "@/features/invoice/schema/tax-invoice.schema";
import { useGetStocks } from "@/features/stock/hooks/useGetStock";
import { ShoppingCart, Plus, Package } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { InvoiceLineRow } from "./invoice-line-row";
import { CreateClientShortcut } from "@/features/clients/components/create-client-shortcut";
import { CreateStockShortcut } from "@/features/stock/components/create-stock-shortcut";
import { useEffect } from "react";

export const InlineInvoiceLinesTable = () => {
  const form = useFormContext<TCreateTaxInvoiceDTO>();

  const { stocks } = useGetStocks();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "invoice_lines",
  });

  const addNewLine = () => {
    append({
      item_id: 0,
      quantity: 1,
      classified_tax_category: "S",
      discount_amount: 0,
      description: undefined,
      price_discount: 0,
    } as any);
  };

  //   useEffect(() => {
  //     console.log(form.getValues());
  //   }, [form.getValues()]);

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
                  <TableHead className="min-w-[250px] flex items-center gap-2 justify-between">
                    <div>
                      Item <span className="text-destructive">*</span>
                    </div>
                    <CreateStockShortcut
                      form={form}
                      name={`invoice_lines.0.item_id`}
                    />
                  </TableHead>
                  <TableHead className="min-w-[120px]">
                    Price <span className="text-destructive">*</span>
                  </TableHead>
                  <TableHead className="min-w-[100px]">
                    Quantity <span className="text-destructive">*</span>
                  </TableHead>
                  <TableHead className="min-w-[200px]">
                    Tax Category <span className="text-destructive">*</span>
                  </TableHead>
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
                    stocks={stocks || []}
                    onRemove={() => remove(index)}
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
