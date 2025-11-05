import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  INVOICE_IDS,
  TAX_EXEMPTION_REASONS_CODES,
  NO_TAX_RATE,
  PAYMENTS_TYPES,
  TAX_CATEGORIES,
  TAX_RATE,
  VAT_DOCUMENTS,
} from "@/features/invoice/constants/invoice.constants";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { TCreateSimplifiedTaxInvoiceDTO } from "@/features/invoice/schema/simplified-tax-invoice.schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FileText,
  User,
  Calendar as CalendarIcon,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CreateSimplifiedTaxInvoiceOptions = () => {
  const form = useFormContext<TCreateSimplifiedTaxInvoiceDTO>();

  const VATDocuments = useWatch({
    control: form.control,
    name: "invoice_type_code",
  });

  const classified_tax_category = useWatch({
    control: form.control,
    name: "classified_tax_category",
  });

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
              Configure your simplified tax invoice details
            </p>
          </div>
        </div>
        <div className="w-fit self-end text-light-green font-bold text-sm border-2 border-light-green py-2 px-6 rounded-full bg-light-green/5">
          Simplified Tax Invoice
        </div>
      </div>

      {/* Main Information Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-light-green" />
            <CardTitle>Basic Information</CardTitle>
          </div>
          <CardDescription>Configure invoice basic settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="classified_tax_category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Tax Category *
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      form.setValue(
                        "tax_rate",
                        value === "Z" ? NO_TAX_RATE : TAX_RATE
                      );
                      form.setValue("party_identification_scheme", "NAT");
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-11 bg-background">
                        <SelectValue placeholder="Select tax category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tax Categories</SelectLabel>
                        {TAX_CATEGORIES.map((tax) => (
                          <SelectItem
                            value={tax.value.toString()}
                            key={tax.value}
                          >
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

            <FormField
              control={form.control}
              name="invoice_type_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    VAT Document Type *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full h-11 bg-background">
                        <SelectValue placeholder="Select VAT document" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>VAT Documents</SelectLabel>
                        {VAT_DOCUMENTS.map((document) => (
                          <SelectItem
                            value={document.value.toString()}
                            key={document.value}
                          >
                            {document.label}
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
                          field.onChange(date?.toISOString().split("T")[0]);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Client Information (Conditional - Zero Tax) */}
      {classified_tax_category === "Z" ? (
        <Card className="border-2 border-blue-200 bg-blue-50/30 dark:bg-blue-950/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              <CardTitle>Client Information</CardTitle>
            </div>
            <CardDescription>
              Client details for zero tax category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="registration_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Client Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter client name"
                        className="h-11 bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="party_identification_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      National ID *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter national ID"
                        className="h-11 bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tax_exemption_reason_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Tax Exemption Reason Code *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full h-11 bg-background">
                          <SelectValue placeholder="Select exemption code" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Exemption Codes</SelectLabel>
                          {TAX_EXEMPTION_REASONS_CODES.map((tax) => (
                            <SelectItem
                              value={tax.value.toString()}
                              key={tax.value}
                            >
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
              <FormField
                control={form.control}
                name="tax_exemption_reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Tax Exemption Reason *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter exemption reason"
                        className="h-11 bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Credit/Debit Note Information (Conditional) */}
      {VATDocuments === "381" || VATDocuments === "383" ? (
        <Card className="border-2 border-orange-200 bg-orange-50/30 dark:bg-orange-950/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-600" />
              <CardTitle>
                {VATDocuments === "381" ? "Credit Note" : "Debit Note"}{" "}
                Information
              </CardTitle>
            </div>
            <CardDescription>
              Additional information for{" "}
              {VATDocuments === "381" ? "credit" : "debit"} notes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="original_invoice_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Original Invoice ID *
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full h-11 bg-background">
                          <SelectValue placeholder="Select original invoice" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Invoice ID</SelectLabel>
                          {INVOICE_IDS.map((invoice) => (
                            <SelectItem
                              value={invoice.value.toString()}
                              key={invoice.value}
                            >
                              {invoice.label}
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
                name="instruction_note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Instruction Note *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter instruction note"
                        className="h-11 bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Additional Notes */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-light-green" />
            <CardTitle>Additional Information</CardTitle>
          </div>
          <CardDescription>
            Add any additional notes or comments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter additional notes, comments, or instructions..."
                    className="min-h-32 resize-none bg-background"
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
