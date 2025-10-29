"use client";
import React, { useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { TCreateTaxInvoiceDTO } from "@/features/invoice/schema/tax-invoice.schema";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  TAX_CATEGORIES,
  TAX_EXEMPTION_REASONS_CODES,
} from "@/features/invoice/constants/invoice.constants";
import { handleNumberInput } from "@/shared/utils/handle-number-input";
import { TStockDTO } from "@/features/stock/schema/stock.schema";
import { FormatRiyal } from "@/components/common/format-riyal";
import { calculateInvoiceLines } from "@/features/invoice/utils/calculate-invoice-lines";

type InvoiceLineRowProps = {
  index: number;
  stocks: TStockDTO[];
  onRemove: () => void;
};

export const InvoiceLineRow = ({
  index,
  stocks,
  onRemove,
}: InvoiceLineRowProps) => {
  const form = useFormContext<TCreateTaxInvoiceDTO>();

  const classifiedTaxCategory = useWatch({
    control: form.control,
    name: `invoice_lines.${index}.classified_tax_category`,
  });

  const stockMap = useMemo(() => {
    const map = new Map<number, TStockDTO>();
    for (const stock of stocks) {
      map.set(Number(stock.id), stock);
    }
    return map;
  }, [stocks]);

  const handleStockChange = (value: string) => {
    const stock = stockMap.get(Number(value));
    if (stock) {
      form.setValue(
        `invoice_lines.${index}.item_price`,
        Number(stock.default_sale_price)
      );
    }
  };

  const showTaxExemption =
    classifiedTaxCategory === "Z" ||
    classifiedTaxCategory === "O" ||
    classifiedTaxCategory === "E";

  const { lineExtensionAmount, taxAmount, roundingAmount } =
    calculateInvoiceLines(
      form.watch(`invoice_lines.${index}`),
      classifiedTaxCategory,
      form.watch("prices_include_tax")
    );

  return (
    <>
      <TableRow className="hover:bg-muted/30">
        <TableCell>
          <FormField
            control={form.control}
            name={`invoice_lines.${index}.item_id`}
            render={({ field }) => (
              <FormItem>
                <Select
                  value={field.value ? field.value.toString() : ""}
                  onValueChange={(value) => {
                    field.onChange(Number(value));
                    handleStockChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Items</SelectLabel>
                      {stocks?.map((stock) => (
                        <SelectItem key={stock.id} value={stock.id.toString()}>
                          <div className="flex flex-col">
                            <span>{stock.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>

        {/* Quantity */}
        <TableCell>
          <FormField
            control={form.control}
            name={`invoice_lines.${index}.item_price`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    onChange={(event) => handleNumberInput({ event, field })}
                    placeholder="0"
                    type="text"
                    // className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>
        <TableCell>
          <FormField
            control={form.control}
            name={`invoice_lines.${index}.quantity`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    onChange={(event) => handleNumberInput({ event, field })}
                    placeholder="0"
                    type="text"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>

        {/* Tax Category */}
        <TableCell>
          <FormField
            control={form.control}
            name={`invoice_lines.${index}.classified_tax_category`}
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select tax" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tax Categories</SelectLabel>
                      {TAX_CATEGORIES.map((taxRate) => (
                        <SelectItem key={taxRate.value} value={taxRate.value}>
                          {taxRate.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>

        {/* Discount */}
        <TableCell>
          <FormField
            control={form.control}
            name={`invoice_lines.${index}.discount_amount`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    onChange={(event) => handleNumberInput({ event, field })}
                    placeholder="0.00"
                    type="text"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>
        <TableCell>
          <FormatRiyal value={lineExtensionAmount} />
        </TableCell>
        <TableCell>
          <FormatRiyal value={taxAmount} />
        </TableCell>
        <TableCell>
          <FormatRiyal value={roundingAmount} />
        </TableCell>
        {/* Description */}
        <TableCell>
          <FormField
            control={form.control}
            name={`invoice_lines.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Add description..."
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>

        {/* Actions */}
        <TableCell className="text-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>

      {/* Tax Exemption Row - Conditional */}
      {showTaxExemption && (
        <TableRow className="bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-50/70 dark:hover:bg-amber-950/30">
          <TableCell colSpan={6}>
            <div className="py-2 space-y-3">
              <p className="text-xs font-semibold text-amber-900 dark:text-amber-100">
                Tax Exemption Details Required
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`invoice_lines.${index}.tax_exemption_reason_code`}
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-xs font-medium">
                        Exemption Code{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Exemption Codes</SelectLabel>
                            {TAX_EXEMPTION_REASONS_CODES.map((tax) => (
                              <SelectItem key={tax.value} value={tax.value}>
                                {tax.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {classifiedTaxCategory === "O" && (
                  <FormField
                    control={form.control}
                    name={`invoice_lines.${index}.tax_exemption_reason`}
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-xs font-medium">
                          Exemption Reason{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Describe reason..."
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
