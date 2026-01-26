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
import { Plus, Package } from "lucide-react";
import React, { useEffect } from "react";
import { useCreateStockShortcut } from "../hooks/useCreateStockShortcut";
import { handleNumberInput } from "@/shared/utils/handle-number-input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { STOCK_UNITS } from "../constants/stock.constants";
import { Textarea } from "@/components/ui/textarea";
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

type TCreateStockShortcutProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  onStockCreated?: () => void;
};

export const CreateStockShortcut = <T extends FieldValues>({
  form,
  name,
  onStockCreated,
}: TCreateStockShortcutProps<T>) => {
  const {
    stock,
    CreateStockForm,
    onCreateStock,
    isCreatingStock,
    open,
    setOpen,
  } = useCreateStockShortcut();
  const isValid = CreateStockForm.formState.isValid;

  useEffect(() => {
    if (stock) {
      form.setValue(name as Path<T>, stock.data.id as PathValue<T, Path<T>>, {
        shouldDirty: true,
        shouldValidate: true,
      });
      // Call the callback to clear search filter and refetch stocks
      onStockCreated?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stock]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="capitalize w-fit flex items-center gap-1 text-light-green cursor-pointer rounded-lg border-2 border-light-green py-1 px-2 hover:bg-light-green/10 transition-all duration-300">
        <Plus className="h-4 w-4 text-light-green" />
        <span className="text-xs text-light-green">Item</span>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[600px] w-full dark:bg-main-black">
        <SheetHeader className="space-y-3 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-light-green/10 rounded-lg">
              <Package className="h-5 w-5 text-light-green" />
            </div>
            <div>
              <SheetTitle className="text-2xl">Add New Item</SheetTitle>
              <SheetDescription>
                Create a new stock item for your inventory
              </SheetDescription>
            </div>
          </div>
          <Separator />
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-220px)] px-4">
          <Form {...CreateStockForm}>
            <form
              className="space-y-6"
              onSubmit={CreateStockForm.handleSubmit(onCreateStock)}
            >
              {/* Basic Information */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {/* <Package className="h-5 w-5 text-light-green" /> */}
                    <CardTitle>Basic Information</CardTitle>
                  </div>
                  <CardDescription>
                    Item name and unit of measurement
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-6">
                  <FormField
                    control={CreateStockForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          Item Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter item name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={CreateStockForm.control}
                    name="unit_code"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          Unit <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {STOCK_UNITS.map((unit) => (
                              <SelectItem key={unit.value} value={unit.value}>
                                {unit.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Pricing Information */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {/* <DollarSign className="h-5 w-5 text-light-green" /> */}
                    <CardTitle>Pricing Information</CardTitle>
                  </div>
                  <CardDescription>
                    Default buy and sale prices for this item
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-6">
                  <FormField
                    control={CreateStockForm.control}
                    name="default_buy_price"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          Default Buy Price{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
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
                  <FormField
                    control={CreateStockForm.control}
                    name="default_sale_price"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          Default Sale Price{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
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

              {/* Additional Details */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {/* <FileText className="h-5 w-5 text-light-green" /> */}
                    <CardTitle>Additional Details</CardTitle>
                  </div>
                  <CardDescription>
                    Optional description and notes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={CreateStockForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter item description..."
                            rows={4}
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
        <SheetFooter className=" bottom-0 p-6 border-t">
          <div className="flex items-center justify-end gap-3 w-full">
            <MainButton
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </MainButton>
            <MainButton
              disabled={!isValid || isCreatingStock}
              type="button"
              isLoading={isCreatingStock}
              loadingText="Creating Item..."
              onClick={CreateStockForm.handleSubmit(onCreateStock)}
            >
              Create Item
            </MainButton>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
