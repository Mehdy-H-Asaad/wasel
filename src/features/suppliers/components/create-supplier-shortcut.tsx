import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Plus, Truck } from "lucide-react";
import React, { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useCreateSupplierShortcut } from "../hooks/use-create-supplier-shortcut";
import { FormField } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectGroup } from "@/components/ui/select";
import { SelectLabel } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { FormMessage } from "@/components/ui/form";
import { MainButton } from "@/components/common/MainButton";
import { CLIENT_IDENTIFCATIONS } from "@/features/clients/constants/client.constant";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type TCreateSupplierShortcutProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
};

export const CreateSupplierShortcut = <T extends FieldValues>({
  form,
  name,
}: TCreateSupplierShortcutProps<T>) => {
  const {
    supplier,
    onCreateSupplier,
    CreateSupplierForm,
    isCreatingSupplier,
    open,
    setOpen,
  } = useCreateSupplierShortcut();
  const isValid = CreateSupplierForm.formState.isValid;

  useEffect(() => {
    if (supplier) {
      form.setValue(
        name as Path<T>,
        supplier.data.id as PathValue<T, Path<T>>,
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplier]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="capitalize w-fit flex items-center gap-1 text-light-green cursor-pointer rounded-lg border-2 border-light-green py-1 px-2 hover:bg-light-green/10 transition-all duration-300">
        <Plus className="h-4 w-4 text-light-green" />
        <span className="text-xs text-light-green">Supplier</span>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[600px] w-full dark:bg-main-black">
        <SheetHeader className="space-y-3 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-light-green/10 rounded-lg">
              <Truck className="h-5 w-5 text-light-green" />
            </div>
            <div>
              <SheetTitle className="text-2xl">Add New Supplier</SheetTitle>
              <SheetDescription>
                Create a new supplier profile for your business
              </SheetDescription>
            </div>
          </div>
          <Separator />
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-220px)] px-4">
          <Form {...CreateSupplierForm}>
            <form
              className="space-y-6"
              onSubmit={CreateSupplierForm.handleSubmit(onCreateSupplier)}
            >
              {/* Company Information */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle>Company Information</CardTitle>
                  </div>
                  <CardDescription>
                    Basic company details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={CreateSupplierForm.control}
                    name="registration_name"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>
                          Company Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter company name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateSupplierForm.control}
                    name="vat_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VAT Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter VAT number"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateSupplierForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter phone number"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateSupplierForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://example.com"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateSupplierForm.control}
                    name="bank_account"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter bank account"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Identification Information */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle>Identification Details</CardTitle>
                  </div>
                  <CardDescription>
                    Legal identification and registration details
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={CreateSupplierForm.control}
                    name="party_identification_scheme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Identification Type</FormLabel>
                        <Select
                          defaultValue={field.value ?? undefined}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select identification type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>
                                Supplier Identifications
                              </SelectLabel>
                              {CLIENT_IDENTIFCATIONS.map((supplier) => (
                                <SelectItem
                                  key={supplier.value}
                                  value={supplier.value}
                                >
                                  {supplier.label}
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
                    control={CreateSupplierForm.control}
                    name="party_identification_value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Identification Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={
                              !CreateSupplierForm.watch(
                                "party_identification_scheme"
                              )
                            }
                            placeholder="Enter identification number"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle>Address Information</CardTitle>
                  </div>
                  <CardDescription>
                    Complete address details for invoicing
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={CreateSupplierForm.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter street name"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateSupplierForm.control}
                    name="building_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Building Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Building no."
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateSupplierForm.control}
                    name="postal_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Postal code"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateSupplierForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter city"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateSupplierForm.control}
                    name="division"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter district"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateSupplierForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Any additional notes..."
                            value={field.value ?? ""}
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </form>
          </Form>
        </ScrollArea>
        <SheetFooter className="p-6 border-t">
          <div className="flex items-center justify-end gap-3 w-full">
            <MainButton
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </MainButton>
            <MainButton
              disabled={!isValid || isCreatingSupplier}
              type="button"
              onClick={CreateSupplierForm.handleSubmit(onCreateSupplier)}
              isLoading={isCreatingSupplier}
              loadingText="Creating Supplier..."
            >
              Create Supplier
            </MainButton>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
