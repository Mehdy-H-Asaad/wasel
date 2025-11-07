import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PAYMENTS_TYPES } from "@/features/invoice/constants/invoice.constants";
import { TCreatePurchaseInvoiceDTO } from "@/features/invoice/schema/purchase-invoice.schema";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { User, Receipt, CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSuppliers } from "@/features/suppliers/hooks/use-get-suppliers";
import { Input } from "@/components/ui/input";
import { CreateSupplierShortcut } from "@/features/suppliers/components/create-supplier-shortcut";

export const CreatePurchaseInvoiceOptions = () => {
  const form = useFormContext<TCreatePurchaseInvoiceDTO>();
  const [supplierOpen, setSupplierOpen] = React.useState(false);

  const { suppliers, isLoadingSuppliers } = useGetSuppliers();

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-light-green/10 rounded-lg">
            <Receipt className="h-6 w-6 text-light-green" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Invoice Information</h2>
            <p className="text-sm text-muted-foreground">
              Configure your purchase invoice details
            </p>
          </div>
        </div>
        <div className="w-fit self-end text-light-green font-bold text-sm border-2 border-light-green py-2 px-6 rounded-full bg-light-green/5">
          Purchase Invoice
        </div>
      </div>

      {/* Main Information Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-light-green" />
            <CardTitle>Supplier & Basic Information</CardTitle>
          </div>
          <CardDescription>
            Select supplier and configure invoice basic settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormField
              control={form.control}
              name="supplier_id"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center justify-between text-sm font-semibold">
                    <span>Supplier - Company *</span>
                    <CreateSupplierShortcut form={form} name="supplier_id" />
                  </FormLabel>
                  {isLoadingSuppliers ? (
                    <Skeleton className="w-full h-11" />
                  ) : (
                    <Popover open={supplierOpen} onOpenChange={setSupplierOpen}>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={supplierOpen}
                            className=" justify-between bg-background font-normal"
                          >
                            {field.value
                              ? suppliers?.find(
                                  (supplier) => supplier.id === field.value
                                )?.registration_name
                              : "Select supplier company"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-[300px] p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search supplier..." />
                          <CommandList>
                            <CommandEmpty>No supplier found.</CommandEmpty>
                            <CommandGroup>
                              {suppliers?.map((supplier) => (
                                <CommandItem
                                  key={supplier.id}
                                  value={supplier.registration_name}
                                  onSelect={() => {
                                    field.onChange(supplier.id);
                                    setSupplierOpen(false);
                                  }}
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${
                                      supplier.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                                  />
                                  {supplier.registration_name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="invoice_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Invoice Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter invoice number"
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payment_means_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Payment Method *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-11 bg-background">
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Payment Types</SelectLabel>
                        {PAYMENTS_TYPES.map((payment) => (
                          <SelectItem
                            value={payment.value.toString()}
                            key={payment.value}
                          >
                            {payment.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="prices_include_tax"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel className="text-sm font-semibold">
                    Prices Include Tax
                  </FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    // defaultValue={field.value ? "true" : "false"}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-11 bg-background">
                        <SelectValue placeholder="Prices include tax" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Prices Include Tax</SelectLabel>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="actual_delivery_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Delivery Date
                  </FormLabel>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className="w-full h-11 justify-between font-normal"
                        >
                          <span
                            className={
                              !field.value ? "text-muted-foreground" : ""
                            }
                          >
                            {field.value
                              ? new Date(field.value).toLocaleDateString()
                              : "Select delivery date"}
                          </span>
                          <CalendarIcon className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          if (date) {
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(
                              2,
                              "0"
                            );
                            const day = String(date.getDate()).padStart(2, "0");
                            field.onChange(`${year}-${month}-${day}`);
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="text-sm font-semibold">Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter additional notes, comments, or instructions..."
                    className="min-h-32 resize-none bg-background"
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};
