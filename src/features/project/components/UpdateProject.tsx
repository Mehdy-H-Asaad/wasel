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
import { useUpdateProject } from "../hooks/use-update-project";
import { handleNumberInput } from "@/shared/utils/handle-number-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CalendarIcon, PencilIcon } from "lucide-react";
import { PROJECT_STATUSES } from "../constants/project.constants";
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
import { TProjectDTO } from "../schema/project.schema";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const UpdateProject = ({
  project,
}: {
  project?: TProjectDTO;
}) => {
  const router = useRouter();
  const [clientSearch, setClientSearch] = useState<string>("");
  const { UpdateProjectForm, onUpdateProject, isUpdatingProject } =
    useUpdateProject({ project });
  const isValid = UpdateProjectForm.formState.isValid;

  const { clients, isLoadingClients } = useGetClients({
    filters: {
      registration_name: clientSearch || undefined,
      limit: 30,
      page: 1,
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"> <PencilIcon className="h-4 w-4" /> Update Project</Button></DialogTrigger>
      <DialogContent>

        <DialogHeader> <DialogTitle>Update Project</DialogTitle>
          <DialogDescription>
            Update the project details by modifying the form below
          </DialogDescription>
        </DialogHeader>
        <Form {...UpdateProjectForm}>
          <form
            className="grid gap-6"
            onSubmit={UpdateProjectForm.handleSubmit(onUpdateProject)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={UpdateProjectForm.control}
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
                control={UpdateProjectForm.control}
                name="customer_id"
                render={() => (
                  <FormItem className="flex flex-col md:col-span-2">
                    <FormLabel className="flex items-center justify-between text-sm font-semibold">
                      <span>
                        Client<span className="text-red-500">*</span>
                      </span>
                      <CreateClientShortcut
                        form={UpdateProjectForm}
                        name="customer_id"
                      />
                    </FormLabel>
                    <AsyncSelectFormField
                      form={UpdateProjectForm}
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
                control={UpdateProjectForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Status <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PROJECT_STATUSES.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={UpdateProjectForm.control}
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
                control={UpdateProjectForm.control}
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
                control={UpdateProjectForm.control}
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
                control={UpdateProjectForm.control}
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
                disabled={isUpdatingProject}
              >
                Cancel
              </Button>
              <MainButton
                disabled={!isValid || isUpdatingProject}
                isLoading={isUpdatingProject}
                loadingText="Updating Project..."
              >
                Update Project
              </MainButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

  );
};
