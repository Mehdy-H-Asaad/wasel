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
import { useCreateProject } from "../hooks/use-create-project";
import { useEffect, useState } from "react";
import { MainButton } from "@/components/common/MainButton";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { CreateClientShortcut } from "@/features/clients/components/create-client-shortcut";
import { AsyncSelectFormField } from "@/components/common/select/async-select-form-field";
import { useGetClients } from "@/features/clients/hooks/useGetClients";
import { handleNumberInput } from "@/shared/utils/handle-number-input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

export const CreateProjectDialog = () => {
  const [open, setOpen] = useState(false);
  const [clientSearch, setClientSearch] = useState<string>("");
  const { CreateProjectForm, onCreateProject, isCreatingProject, isCreateSuccess } =
    useCreateProject();

  const { clients, isLoadingClients } = useGetClients({
    filters: {
      registration_name: clientSearch || undefined,
      limit: 30,
      page: 1,
    },
  });

  useEffect(() => {
    if (isCreateSuccess) {
      setOpen(false);
      CreateProjectForm.reset();
    }
  }, [isCreateSuccess, CreateProjectForm]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MainButton>
          <Plus className="h-4 w-4" />
          Add Project
        </MainButton>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Add a new project to your business
        </DialogDescription>
        <Form {...CreateProjectForm}>
          <form
            className="grid gap-4"
            onSubmit={CreateProjectForm.handleSubmit(onCreateProject)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={CreateProjectForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>
                      Project Name<span className="text-red-500">*</span>
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
                  <FormItem className="md:col-span-2">
                    <FormLabel>Budget Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter budget"
                        onChange={(event) => handleNumberInput({ field, event, })}
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
                      Start Date<span className="text-red-500">*</span>
                    </FormLabel>
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between font-normal"
                          >
                            <span
                              className={!field.value ? "text-muted-foreground" : ""}
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
                          selected={field.value ? new Date(field.value) : undefined}
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
                              className={!field.value ? "text-muted-foreground" : ""}
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
                          selected={field.value ? new Date(field.value) : undefined}
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
                        placeholder="Enter project description"
                        value={field.value ?? ""}
                        className="min-h-24"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <MainButton
              disabled={isCreatingProject}
              className="w-full mt-4"
              isLoading={isCreatingProject}
              loadingText="Creating..."
              type="submit"
            >
              Create Project
            </MainButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
