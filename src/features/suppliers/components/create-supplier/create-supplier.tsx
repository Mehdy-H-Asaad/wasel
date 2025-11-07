"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MainButton } from "@/components/common/MainButton";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { useCreateSupplier } from "../../hooks/use-create-supplier";
import { CLIENT_IDENTIFCATIONS } from "@/features/clients/constants/client.constant";
import { Building2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const CreateSupplier = () => {
  const router = useRouter();
  const { CreateSupplierForm, isCreatingSupplier, onCreateSupplier } =
    useCreateSupplier();
  const isValid = CreateSupplierForm.formState.isValid;

  return (
    <div className="">
      <Card className="dark:bg-main-black">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <Building2 className="h-6 w-6 text-light-green" /> Create New
            Supplier
          </CardTitle>
          <CardDescription>
            Add a new supplier to your system by filling out the form below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...CreateSupplierForm}>
            <form
              className="grid gap-6"
              onSubmit={CreateSupplierForm.handleSubmit(onCreateSupplier)}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={CreateSupplierForm.control}
                  name="registration_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Supplier - Company{" "}
                        <span className="text-red-500">*</span>
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
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isCreatingSupplier}
                >
                  Cancel
                </Button>
                <MainButton
                  disabled={!isValid || isCreatingSupplier}
                  isLoading={isCreatingSupplier}
                  loadingText="Creating Supplier..."
                >
                  Create Supplier
                </MainButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
