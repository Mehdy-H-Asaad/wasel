import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PAYMENTS_TYPES } from "@/features/invoice/constants/invoice.constants";
import { TCreateSaleTaxInvoiceDTO } from "@/features/invoice/schema/sale-tax-invoice.schema";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useGetClients } from "@/features/clients/hooks/useGetClients";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Receipt, CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateClientShortcut } from "@/features/clients/components/create-client-shortcut";
import { AsyncSelectFormField } from "@/components/common/select/async-select-form-field";
import { SelectFormField } from "@/components/common/select/select-form-field";

export const CreateTaxSaleInvoiceOptions = () => {
  const form = useFormContext<TCreateSaleTaxInvoiceDTO>();
  const [clientSearch, setClientSearch] = React.useState<string>("");

  const { clients, isLoadingClients } = useGetClients({
    limit: 10,
    page: 1,
    filters: {
      registration_name: clientSearch || undefined,
    },
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
              Configure your tax invoice details
            </p>
          </div>
        </div>
        <div className="w-fit self-end text-light-green font-bold text-sm border-2 border-light-green py-2 px-6 rounded-full bg-light-green/5">
          Sale Invoice
        </div>
      </div>

      {/* Main Information Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            {/* <User className="h-5 w-5 text-light-green" /> */}
            <CardTitle>Client & Basic Information</CardTitle>
          </div>
          <CardDescription>
            Select client and configure invoice basic settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormField
              control={form.control}
              name="customer_id"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center justify-between text-sm font-semibold">
                    <span>
                      Client - Company <span className="text-red-500">*</span>
                    </span>
                    <CreateClientShortcut form={form} name="customer_id" />
                  </FormLabel>

                  <AsyncSelectFormField
                    form={form}
                    placeholder="Select client company"
                    name="customer_id"
                    options={
                      clients?.map((client) => ({
                        value: client.id,
                        label: client.registration_name,
                      })) ?? []
                    }
                    onSearch={setClientSearch}
                    isLoading={isLoadingClients}
                  />

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
                    Payment Method <span className="text-red-500">*</span>
                  </FormLabel>
                  <SelectFormField
                    field={field}
                    label="Payment Method"
                    options={PAYMENTS_TYPES.map((payment) => ({
                      label: payment.label,
                      value: payment.value.toString(),
                    }))}
                  />
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
                    Prices Include Tax <span className="text-red-500">*</span>
                  </FormLabel>

                  <SelectFormField
                    field={field}
                    label="Prices Include Tax"
                    options={[
                      { label: "Yes", value: true },
                      { label: "No", value: false },
                    ]}
                  />
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
                    Delivery Date <span className="text-red-500">*</span>
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
                <FormLabel className="text-sm font-semibold">Note</FormLabel>
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
