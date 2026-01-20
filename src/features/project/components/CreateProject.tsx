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
import { useCreateProject } from "../hooks/use-create-project";
import { handleNumberInput } from "@/shared/utils/handle-number-input";
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
import { FolderKanban, CalendarIcon } from "lucide-react";
import { CreateClientShortcut } from "@/features/clients/components/create-client-shortcut";
import { AsyncSelectFormField } from "@/components/common/select/async-select-form-field";
import { useGetClients } from "@/features/clients/hooks/useGetClients";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const CreateProject = () => {
  const router = useRouter();
  const [clientSearch, setClientSearch] = useState<string>("");
  const { CreateProjectForm, onCreateProject, isCreatingProject } =
    useCreateProject();
  const isValid = CreateProjectForm.formState.isValid;

  const { clients, isLoadingClients } = useGetClients({
    filters: {
      registration_name: clientSearch || undefined,
      limit: 30,
      page: 1,
    },
  });

  return (
    <div className="">
      <Card className="dark:bg-main-black">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <FolderKanban className="h-6 w-6 text-light-green" /> Create New
            Project
          </CardTitle>
          <CardDescription>
            Add a new project to your system by filling out the form below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...CreateProjectForm}>
            <form
              className="grid gap-6"
              onSubmit={CreateProjectForm.handleSubmit(onCreateProject)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={CreateProjectForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>
                        Project Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Project Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={CreateProjectForm.control}
                  name="customer_id"
                  render={() => (
                    <FormItem className="flex flex-col md:col-span-2">
                      <FormLabel className="flex items-center justify-between text-sm font-semibold">
                        <span>
                          Client<span className="text-red-500">*</span>
                        </span>
                        <CreateClientShortcut
                          form={CreateProjectForm}
                          name="customer_id"
                        />
                      </FormLabel>
                      <AsyncSelectFormField
                        form={CreateProjectForm}
                        placeholder="Select client"
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
                  control={CreateProjectForm.control}
                  name="budget_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget Amount</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Budget Amount"
                          onChange={(event) =>
                            handleNumberInput({ field, event })
                          }
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={CreateProjectForm.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Start Date <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <FormControl>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between font-normal"
                            >
                              <span
                                className={
                                  !field.value ? "text-muted-foreground" : ""
                                }
                              >
                                {field.value
                                  ? new Date(field.value).toLocaleDateString()
                                  : "Select start date"}
                              </span>
                              <CalendarIcon className="h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                        </FormControl>
                        <PopoverContent className="w-auto p-0" align="start">
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

                <FormField
                  control={CreateProjectForm.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <FormControl>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between font-normal"
                            >
                              <span
                                className={
                                  !field.value ? "text-muted-foreground" : ""
                                }
                              >
                                {field.value
                                  ? new Date(field.value).toLocaleDateString()
                                  : "Select end date"}
                              </span>
                              <CalendarIcon className="h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                        </FormControl>
                        <PopoverContent className="w-auto p-0" align="start">
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
                              } else {
                                field.onChange(null);
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={CreateProjectForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Description"
                          value={field.value ?? ""}
                          className="min-h-32"
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
                  disabled={isCreatingProject}
                >
                  Cancel
                </Button>
                <MainButton
                  disabled={!isValid || isCreatingProject}
                  isLoading={isCreatingProject}
                  loadingText="Creating Project..."
                >
                  Create Project
                </MainButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
