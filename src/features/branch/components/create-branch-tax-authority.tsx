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
import { useCreateBranchTaxAuthority } from "../hooks/use-create-branch-tax-authority";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CLIENT_IDENTIFCATIONS } from "@/features/clients/constants/client.constant";



export const CreateBranchTaxAuthority = ({
  branchId,
}: {
  branchId: string;
}) => {
  const router = useRouter();
  const {
    CreateBranchTaxAuthorityForm,
    onCreateBranchTaxAuthority,
    isCreatingBranchTaxAuthority,
  } = useCreateBranchTaxAuthority({ branchId: parseInt(branchId) });
  const isValid = CreateBranchTaxAuthorityForm.formState.isValid;

  return (
    <div className="">
      <Card className="dark:bg-main-black">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            Integration
          </CardTitle>
          <CardDescription>
            Configure your branch for ZATCA Phase 2 e-invoicing compliance by
            providing the required tax authority information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...CreateBranchTaxAuthorityForm}>
            <form
              className="grid gap-6"
              onSubmit={CreateBranchTaxAuthorityForm.handleSubmit(
                onCreateBranchTaxAuthority
              )}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">



                {/* Registration Name */}
                <FormField
                  control={CreateBranchTaxAuthorityForm.control}
                  name="registration_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Registration Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Registration Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Common Name */}
                <FormField
                  control={CreateBranchTaxAuthorityForm.control}
                  name="common_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Common Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Common Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Organization Unit Name */}
                <FormField
                  control={CreateBranchTaxAuthorityForm.control}
                  name="organization_unit_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Organization Unit Name{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Organization Unit Name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Organization Name */}
                <FormField
                  control={CreateBranchTaxAuthorityForm.control}
                  name="organization_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Organization Name{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Organization Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* VAT Number */}
                <FormField
                  control={CreateBranchTaxAuthorityForm.control}
                  name="vat_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        VAT Number (15 digits){" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="VAT Number (15 digits)"
                          maxLength={15}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Invoicing Type */}
                <FormField
                  control={CreateBranchTaxAuthorityForm.control}
                  name="invoicing_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Invoicing Type <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Invoicing Type" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Business Category */}
                <FormField
                  control={CreateBranchTaxAuthorityForm.control}
                  name="business_category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Business Category{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Business Category" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Street */}
                <FormField
                  control={CreateBranchTaxAuthorityForm.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Street <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Street" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Building Number */}
                <FormField
                  control={CreateBranchTaxAuthorityForm.control}
                  name="building_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Building Number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Building Number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Division/District */}
                <FormField
                  control={CreateBranchTaxAuthorityForm.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        District <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="District" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* City */}
                <FormField
                  control={CreateBranchTaxAuthorityForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        City <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="City" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Postal Code */}
                <FormField
                  control={CreateBranchTaxAuthorityForm.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Postal Code (5 digits){" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Postal Code (5 digits)"
                          maxLength={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  control={CreateBranchTaxAuthorityForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Full Address (min 10 characters){" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Full Address"
                          className="md:col-span-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Party Identification Scheme */}
                <FormField
                  control={CreateBranchTaxAuthorityForm.control}
                  name="party_identification_scheme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Party Identification Scheme{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Party Identification Scheme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CLIENT_IDENTIFCATIONS.map((client) => (
                            <SelectItem key={client.value} value={client.value}>
                              {client.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Party Identification Value */}
                <FormField
                  control={CreateBranchTaxAuthorityForm.control}
                  name="party_identification_value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Party Identification Value{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!CreateBranchTaxAuthorityForm.watch("party_identification_scheme")}
                          placeholder="Party Identification Value"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isCreatingBranchTaxAuthority}
                >
                  Cancel
                </Button>
                <MainButton
                  disabled={!isValid || isCreatingBranchTaxAuthority}
                  isLoading={isCreatingBranchTaxAuthority}
                  loadingText="Configuring Tax Authority..."
                >
                  Submit Tax Authority Data
                </MainButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
