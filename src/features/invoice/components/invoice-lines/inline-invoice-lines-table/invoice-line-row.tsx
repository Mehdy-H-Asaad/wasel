"use client";
import React, { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { TCreateTaxInvoiceDTO } from "@/features/invoice/schema/sale-tax-invoice.schema";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { CreateStockShortcut } from "@/features/stock/components/create-stock-shortcut";
import { useGetStocks } from "@/features/stock/hooks/useGetStock";
import { Skeleton } from "@/components/ui/skeleton";

type InvoiceLineRowProps = {
  index: number;
  onRemove: () => void;
  showExemptionCode: boolean;
  showExemptionReason: boolean;
  isSaleInvoice: boolean;
};

export const InvoiceLineRow = ({
  index,
  onRemove,
  showExemptionCode,
  showExemptionReason,
  isSaleInvoice,
}: InvoiceLineRowProps) => {
  const form = useFormContext<TCreateTaxInvoiceDTO>();
  const [itemOpen, setItemOpen] = React.useState(false);

  const classifiedTaxCategory = useWatch({
    control: form.control,
    name: `invoice_lines.${index}.classified_tax_category`,
  });

  const { stocks, isLoadingStocks } = useGetStocks();

  const stockMap = useMemo(() => {
    const map = new Map<number, TStockDTO>();
    for (const stock of stocks || []) {
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
    <TableRow className="hover:bg-muted/30">
      <TableCell>
        <FormField
          control={form.control}
          name={`invoice_lines.${index}.item_id`}
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-2">
              {isLoadingStocks ? (
                <Skeleton className="w-full h-11" />
              ) : (
                <Popover open={itemOpen} onOpenChange={setItemOpen}>
                  <FormControl>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={itemOpen}
                        className="max-w-96 w-52 justify-between font-normal"
                      >
                        {field.value
                          ? stocks?.find(
                              (stock) =>
                                Number(stock.id) === Number(field.value)
                            )?.name
                          : "Select item"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                  </FormControl>
                  <PopoverContent className="w-[300px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search item..." />
                      <CommandList>
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup>
                          {stocks?.map((stock) => (
                            <CommandItem
                              key={stock.id}
                              value={stock.name}
                              onSelect={() => {
                                field.onChange(stock.id);
                                handleStockChange(stock.id.toString());
                                setItemOpen(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  Number(stock.id) === Number(field.value)
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {stock.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
              <CreateStockShortcut
                form={form}
                name={`invoice_lines.${index}.item_id`}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>

      {/* Price */}
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>

      {/* Quantity */}
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

      {/* Tax Exemption Code - Only show if columns are visible */}
      {showExemptionCode && (
        <TableCell>
          {showTaxExemption ? (
            <FormField
              control={form.control}
              name={`invoice_lines.${index}.tax_exemption_reason_code`}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
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
          ) : (
            <div className="text-muted-foreground text-sm">-</div>
          )}
        </TableCell>
      )}

      {/* Tax Exemption Reason - Only show if columns are visible and category is O */}
      {showExemptionReason && (
        <TableCell>
          {classifiedTaxCategory === "O" ? (
            <FormField
              control={form.control}
              name={`invoice_lines.${index}.tax_exemption_reason`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Describe reason..."
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className="text-muted-foreground text-sm">-</div>
          )}
        </TableCell>
      )}
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
      {/* Sub Total */}
      <TableCell>
        <FormatRiyal value={lineExtensionAmount} />
      </TableCell>

      {/* Tax */}
      <TableCell>
        <FormatRiyal value={taxAmount} />
      </TableCell>

      {/* Total */}
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
  );
};
