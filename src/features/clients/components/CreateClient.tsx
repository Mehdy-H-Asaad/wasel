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
import { useCreateClient } from "../hooks/useCreateClient";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { CLIENT_IDENTIFCATIONS } from "../constants/client.constant";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

export const CreateClient = () => {
  const router = useRouter();
  const { CreateClientForm, isCreatingClient, onCreateClient } =
    useCreateClient();
  const isValid = CreateClientForm.formState.isValid;

  return (
    <div className="">
      <Card className="dark:bg-main-black">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <User className="h-6 w-6 text-light-green" /> Create New Client
          </CardTitle>
          <CardDescription>
            Add a new client to your system by filling out the form below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...CreateClientForm}>
            <form
              className="grid gap-6"
              onSubmit={CreateClientForm.handleSubmit(onCreateClient)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={CreateClientForm.control}
                  name="registration_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Client - Company <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Client - Company" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={CreateClientForm.control}
                  name="party_identification_scheme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Client Identification{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Client Identification" />
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
                        Identification Value{" "}
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
                          placeholder="Identification Value"
                        />
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
                        <Input {...field} placeholder="VAT Number" />
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
                        <Input {...field} placeholder="Phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={CreateClientForm.control}
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
                  control={CreateClientForm.control}
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
                <FormField
                  control={CreateClientForm.control}
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
                <FormField
                  control={CreateClientForm.control}
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
                <FormField
                  control={CreateClientForm.control}
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
                <FormField
                  control={CreateClientForm.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Postal Code <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Postal Code" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={CreateClientForm.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Input
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
                  disabled={isCreatingClient}
                >
                  Cancel
                </Button>
                <MainButton
                  disabled={!isValid || isCreatingClient}
                  isLoading={isCreatingClient}
                  loadingText="Creating Client..."
                >
                  Create Client
                </MainButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
