import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Plus, User, MapPin, Building2, IdCard } from "lucide-react";
import React, { useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useCreateClientShortcut } from "../hooks/useCreateClientShortcut";
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
import { CLIENT_IDENTIFCATIONS } from "../constants/client.constant";
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

type TCreateClientShortcutProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
};

export const CreateClientShortcut = <T extends FieldValues>({
  form,
  name,
}: TCreateClientShortcutProps<T>) => {
  const {
    client,
    onCreateClient,
    CreateClientForm,
    isCreatingClient,
    open,
    setOpen,
  } = useCreateClientShortcut();
  const isValid = CreateClientForm.formState.isValid;

  useEffect(() => {
    if (client) {
      form.setValue(name as Path<T>, client.data.id as PathValue<T, Path<T>>, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="capitalize w-fit flex items-center gap-1 text-light-green cursor-pointer rounded-lg border-2 border-light-green py-1 px-2 hover:bg-light-green/10 transition-all duration-300">
        <Plus className="h-4 w-4 text-light-green" />
        <span className="text-xs text-light-green">Client</span>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[800px] w-full dark:bg-main-black">
        <SheetHeader className="space-y-3 ">
          <div className="flex items-center gap-3">
            <div className="p-4 bg-light-green/10 rounded-lg">
              <User className="h-5 w-5 text-light-green" />
            </div>
            <div>
              <SheetTitle className="text-2xl">Add New Client</SheetTitle>
              <SheetDescription>
                Create a new client profile for your business
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="h-[calc(100vh-180px)] px-4">
          <Form {...CreateClientForm}>
            <form
              className="space-y-6"
              onSubmit={CreateClientForm.handleSubmit(onCreateClient)}
            >
              {/* Company Information */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-light-green" />
                    <CardTitle>Company Information</CardTitle>
                  </div>
                  <CardDescription>
                    Basic company details and registration information
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={CreateClientForm.control}
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
                    control={CreateClientForm.control}
                    name="vat_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          VAT Number <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter VAT number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateClientForm.control}
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
                    control={CreateClientForm.control}
                    name="bank_account"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
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
                    <IdCard className="h-5 w-5 text-light-green" />
                    <CardTitle>Identification Details</CardTitle>
                  </div>
                  <CardDescription>
                    Legal identification and registration details
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={CreateClientForm.control}
                    name="party_identification_scheme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Identification Type{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select identification type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Client Identifications</SelectLabel>
                              {CLIENT_IDENTIFCATIONS.map((client) => (
                                <SelectItem
                                  key={client.value}
                                  value={client.value}
                                >
                                  {client.label}
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
                    control={CreateClientForm.control}
                    name="party_identification_value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Identification Number{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={
                              !CreateClientForm.watch(
                                "party_identification_scheme"
                              )
                            }
                            placeholder="Enter identification number"
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
                    <MapPin className="h-5 w-5 text-light-green" />
                    <CardTitle>Address Information</CardTitle>
                  </div>
                  <CardDescription>
                    Complete address details for invoicing
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={CreateClientForm.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>
                          Street <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter street name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateClientForm.control}
                    name="building_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Building Number{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Building no." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateClientForm.control}
                    name="postal_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Postal Code <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Postal code" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateClientForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          City <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter city" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateClientForm.control}
                    name="division"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          District <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter district" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateClientForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Any additional notes..."
                            value={field.value ?? ""}
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
        <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
          <div className="flex items-center justify-end gap-3 w-full">
            <MainButton
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </MainButton>
            <MainButton
              disabled={!isValid || isCreatingClient}
              type="button"
              onClick={CreateClientForm.handleSubmit(onCreateClient)}
              isLoading={isCreatingClient}
              loadingText="Creating Client..."
            >
              Create Client
            </MainButton>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
