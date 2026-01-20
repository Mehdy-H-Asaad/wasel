import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, FolderKanban, CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useCreateProjectShortcut } from "../hooks/use-create-project-shortcut";
import { MainButton } from "@/components/common/MainButton";
import { FieldValues, PathValue, UseFormReturn } from "react-hook-form";
import { Path } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { handleNumberInput } from "@/shared/utils/handle-number-input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreateClientShortcut } from "@/features/clients/components/create-client-shortcut";
import { AsyncSelectFormField } from "@/components/common/select/async-select-form-field";
import { useGetClients } from "@/features/clients/hooks/useGetClients";

type TCreateProjectShortcutProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
};

export const CreateProjectShortcut = <T extends FieldValues>({
  form,
  name,
}: TCreateProjectShortcutProps<T>) => {
  const [clientSearch, setClientSearch] = useState<string>("");
  const {
    project,
    CreateProjectForm,
    onCreateProject,
    isCreatingProject,
    open,
    setOpen,
  } = useCreateProjectShortcut();
  const isValid = CreateProjectForm.formState.isValid;

  const { clients, isLoadingClients } = useGetClients({
    filters: {
      registration_name: clientSearch || undefined,
      limit: 30,
      page: 1,
    },
  });

  useEffect(() => {
    if (project) {
      form.setValue(name as Path<T>, project.data.id as PathValue<T, Path<T>>, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="capitalize w-fit flex items-center gap-1 text-light-green cursor-pointer rounded-lg border-2 border-light-green py-1 px-2 hover:bg-light-green/10 transition-all duration-300">
        <Plus className="h-4 w-4 text-light-green" />
        <span className="text-xs text-light-green">Project</span>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[600px] w-full dark:bg-main-black">
        <SheetHeader className="space-y-3 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-light-green/10 rounded-lg">
              <FolderKanban className="h-5 w-5 text-light-green" />
            </div>
            <div>
              <SheetTitle className="text-2xl">Add New Project</SheetTitle>
              <SheetDescription>
                Create a new project for your business
              </SheetDescription>
            </div>
          </div>
          <Separator />
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-220px)] px-4">
          <Form {...CreateProjectForm}>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                CreateProjectForm.handleSubmit(onCreateProject)(e);
              }}
            >
              {/* Basic Information */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Project name and description
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={CreateProjectForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Project Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter project name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateProjectForm.control}
                    name="customer_id"
                    render={() => (
                      <FormItem className="flex flex-col">
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter description"
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


              {/* Dates & Budget */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Timeline & Budget</CardTitle>
                  <CardDescription>Project dates and budget amount</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    name="budget_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Amount</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="0"
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
                </CardContent>
              </Card>
            </form>
          </Form>
        </ScrollArea>
        <SheetFooter className="bottom-0 p-6 border-t">
          <div className="flex items-center justify-end gap-3 w-full">
            <MainButton
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </MainButton>
            <MainButton
              disabled={!isValid || isCreatingProject}
              type="button"
              isLoading={isCreatingProject}
              loadingText="Creating Project..."
              onClick={CreateProjectForm.handleSubmit(onCreateProject)}
            >
              Create Project
            </MainButton>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
