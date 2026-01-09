import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PAYMENTS_TYPES } from "@/features/invoice/constants/invoice.constants";
import { TCreateCreditNoteDTO } from "@/features/invoice/schema/credit-note.schema";
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
import { Input } from "@/components/ui/input";

export const CreateCreditNoteOptions = () => {
  const form = useFormContext<TCreateCreditNoteDTO>();
  const [clientSearch, setClientSearch] = React.useState<string>("");

  const { clients, isLoadingClients } = useGetClients({
    filters: {
      registration_name: clientSearch || undefined,
      limit: 30,
      page: 1,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-500/10 rounded-lg">
            <Receipt className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Credit Note Information</h2>
            <p className="text-sm text-muted-foreground">
              Create a credit note for a previous invoice
            </p>
          </div>
        </div>
        <div className="w-fit self-end text-red-500 font-bold text-sm border-2 border-red-500 py-2 px-6 rounded-full bg-red-500/5">
          Credit Note
        </div>
      </div>

      {/* Main Information Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Client & Basic Information</CardTitle>
          </div>
          <CardDescription>
            Select client and configure credit note basic settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FormField
              control={form.control}
              name="original_invoice_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Original Invoice Number{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Original invoice number"
                      className="h-11"
                      value={field.value || ""}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    placeholder="Select payment method"
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
                    placeholder="Select prices include tax"
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
                    placeholder="Enter reason for credit note or additional notes..."
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
