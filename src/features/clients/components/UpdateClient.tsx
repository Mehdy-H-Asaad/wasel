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
import { useUpdateClient } from "../hooks/useUpdateClient";
import { CLIENT_IDENTIFCATIONS } from "../constants/client.constant";
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
import { User } from "lucide-react";
import { useGetSingleClient } from "../hooks/use-get-single-client";
import { Skeleton } from "@/components/ui/skeleton";

export const UpdateClient = ({ clientId }: { clientId: string }) => {
  const router = useRouter();
  const { client, isLoadingClient: isLoading } = useGetSingleClient({
    id: clientId,
  });
  const { UpdateClientForm, isUpdatingClient, onUpdateClient } =
    useUpdateClient({ client });
  const isValid =
    UpdateClientForm.formState.isValid &&
    !isLoading &&
    UpdateClientForm.formState.isDirty;

  if (isLoading) {
    return <Skeleton className="h-[calc(100%-100px)] w-full" />;
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Client not found</div>
      </div>
    );
  }

  return (
    <div className="">
      <Card className="dark:bg-main-black">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <User className="h-6 w-6 text-light-green" /> Update Client
          </CardTitle>
          <CardDescription>
            Update client information by modifying the form below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...UpdateClientForm}>
            <form
              className="grid gap-6"
              onSubmit={UpdateClientForm.handleSubmit(onUpdateClient)}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={UpdateClientForm.control}
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
                  control={UpdateClientForm.control}
                  name="party_identification_scheme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Identification</FormLabel>
                      <Select
                        defaultValue={field.value ?? undefined}
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
                  control={UpdateClientForm.control}
                  name="party_identification_value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identification Value</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={
                            !UpdateClientForm.watch(
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
                  control={UpdateClientForm.control}
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
                  control={UpdateClientForm.control}
                  name="bank_account"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Account</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Bank Account"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={UpdateClientForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Phone"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={UpdateClientForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Email"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={UpdateClientForm.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="WhatsApp"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={UpdateClientForm.control}
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
                  control={UpdateClientForm.control}
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
                  control={UpdateClientForm.control}
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
                  control={UpdateClientForm.control}
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
                  control={UpdateClientForm.control}
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
                  control={UpdateClientForm.control}
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
                  disabled={isUpdatingClient}
                >
                  Cancel
                </Button>
                <MainButton
                  disabled={!isValid || isUpdatingClient}
                  isLoading={isUpdatingClient}
                  loadingText="Updating Client..."
                >
                  Update Client
                </MainButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
