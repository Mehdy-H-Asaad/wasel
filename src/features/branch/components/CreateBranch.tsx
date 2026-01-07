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
import { useCreateBranch } from "../hooks/use-create-branch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Building2 } from "lucide-react";

export const CreateBranch = () => {
  const router = useRouter();
  const { CreateBranchForm, onCreateBranch, isCreatingBranch } =
    useCreateBranch();
  const isValid = CreateBranchForm.formState.isValid;

  return (
    <div className="">
      <Card className="dark:bg-main-black">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <Building2 className="h-6 w-6 text-light-green" /> Create New Branch
          </CardTitle>
          <CardDescription>
            Add a new branch to your system by filling out the form below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...CreateBranchForm}>
            <form
              className="grid gap-6"
              onSubmit={CreateBranchForm.handleSubmit(onCreateBranch)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={CreateBranchForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Branch Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Branch Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={CreateBranchForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Phone <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Phone Number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={CreateBranchForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="City"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={CreateBranchForm.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="District"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={CreateBranchForm.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Street"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={CreateBranchForm.control}
                  name="building_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Building Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Building Number"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={CreateBranchForm.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Postal Code"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={CreateBranchForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Full Address"
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
                  disabled={isCreatingBranch}
                >
                  Cancel
                </Button>
                <MainButton
                  disabled={!isValid || isCreatingBranch}
                  isLoading={isCreatingBranch}
                  loadingText="Creating Branch..."
                >
                  Create Branch
                </MainButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

