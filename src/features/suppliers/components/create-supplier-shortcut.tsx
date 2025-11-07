import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
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
import { DialogFooter } from "@/components/ui/dialog";
import { MainButton } from "@/components/common/MainButton";
import { CLIENT_IDENTIFCATIONS } from "@/features/clients/constants/client.constant";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="capitalize w-fit flex items-center gap-1 text-light-green cursor-pointer rounded-lg border-2 border-light-green py-1 px-2 hover:bg-light-green/10 transition-all duration-300">
        <Plus className="h-4 w-4 text-light-green" />
        <span className="text-xs text-light-green">Supplier</span>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[60rem] dark:bg-main-black">
        <DialogHeader>
          <DialogTitle>Add New Supplier</DialogTitle>
          <DialogDescription>
            Add a new supplier to your system
          </DialogDescription>
        </DialogHeader>
        <Form {...CreateSupplierForm}>
          <form
            className="grid gap-4"
            onSubmit={CreateSupplierForm.handleSubmit(onCreateSupplier)}
          >
            <div className="grid grid-cols-3 gap-6">
              <FormField
                control={CreateSupplierForm.control}
                name="registration_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Supplier - Company <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Supplier - Company" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={CreateSupplierForm.control}
                name="party_identification_scheme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Identification</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Supplier Identification" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Supplier Identifications</SelectLabel>
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
                    <FormLabel>Identification Value</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={
                          !CreateSupplierForm.watch(
                            "party_identification_scheme"
                          )
                        }
                        placeholder="Identification Value"
                      />
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
                      <Input {...field} placeholder="VAT Number" />
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
                      <Input {...field} placeholder="Phone" />
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
                      <Input {...field} placeholder="Website" />
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
                      <Input {...field} placeholder="Bank Account" />
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
                      <Input {...field} placeholder="City" />
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
                      <Input {...field} placeholder="District" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={CreateSupplierForm.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Street" />
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
                      <Input {...field} placeholder="Building Number" />
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
                      <Input {...field} placeholder="Postal Code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={CreateSupplierForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Note"
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <MainButton
                disabled={!isValid || isCreatingSupplier}
                type="button"
                onClick={CreateSupplierForm.handleSubmit(onCreateSupplier)}
                isLoading={isCreatingSupplier}
                loadingText="Creating Supplier..."
              >
                Create Supplier
              </MainButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
