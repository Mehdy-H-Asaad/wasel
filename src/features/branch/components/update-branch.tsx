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
import { useUpdateBranch } from "../hooks/use-update-branch";
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
import { useGetSingleBranch } from "../hooks/use-get-single-branch";
import { Skeleton } from "@/components/ui/skeleton";

export const UpdateBranch = ({ branchId }: { branchId: string }) => {
  const router = useRouter();
  const { branch, isLoadingBranch: isLoading } = useGetSingleBranch({
    id: branchId,
  });
  const { UpdateBranchForm, isUpdatingBranch, onUpdateBranch } =
    useUpdateBranch({ branch });

  const isValid =
    UpdateBranchForm.formState.isValid &&
    !isLoading &&
    UpdateBranchForm.formState.isDirty;

  if (isLoading) {
    return <Skeleton className="h-[calc(100%-100px)] w-full" />;
  }

  if (!branch) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Branch not found</div>
      </div>
    );
  }

  return (
    <div className="">
      <Card className="dark:bg-main-black">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <Building2 className="h-6 w-6 text-light-green" /> Update Branch
          </CardTitle>
          <CardDescription>
            Update branch information by modifying the form below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...UpdateBranchForm}>
            <form
              className="grid gap-6"
              onSubmit={UpdateBranchForm.handleSubmit(onUpdateBranch)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={UpdateBranchForm.control}
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
                  control={UpdateBranchForm.control}
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
                  control={UpdateBranchForm.control}
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
                  control={UpdateBranchForm.control}
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
                  control={UpdateBranchForm.control}
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
                  control={UpdateBranchForm.control}
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
                  control={UpdateBranchForm.control}
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
                  control={UpdateBranchForm.control}
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
                  disabled={isUpdatingBranch}
                >
                  Cancel
                </Button>
                <MainButton
                  disabled={!isValid || isUpdatingBranch}
                  isLoading={isUpdatingBranch}
                  loadingText="Updating Branch..."
                >
                  Update Branch
                </MainButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
