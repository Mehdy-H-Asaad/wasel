import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import { useCreateStock } from "../hooks/useCreateStock";
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
import { DialogFooter } from "@/components/ui/dialog";
import { MainButton } from "@/components/common/MainButton";
import { FieldValues, PathValue, UseFormReturn } from "react-hook-form";
import { Path } from "react-hook-form";

type TCreateStockShortcutProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
};

export const CreateStockShortcut = <T extends FieldValues>({
  form,
  name,
}: TCreateStockShortcutProps<T>) => {
  const {
    stock,
    CreateStockForm,
    onCreateStock,
    isCreatingStock,
    open,
    setOpen,
  } = useCreateStock();
  const isValid = CreateStockForm.formState.isValid;

  useEffect(() => {
    if (stock) {
      form.setValue(name as Path<T>, stock.data.id as PathValue<T, Path<T>>, {
        shouldDirty: true,
        shouldValidate: true,
      });
      // form.setValue(
      //   name as Path<T>,
      //   stock.data.default_sale_price as PathValue<T, Path<T>>,
      //   {
      //     shouldDirty: true,
      //     shouldValidate: true,
      //   }
      // );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stock]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="capitalize w-fit flex items-center gap-1 text-light-green cursor-pointer rounded-lg border-2 border-light-green py-1 px-2 hover:bg-light-green/10 transition-all duration-300">
        <Plus className="h-4 w-4 text-light-green" />
        <span className="text-xs text-light-green">Item</span>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[425px] dark:bg-main-black">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>Add a new item to your system</DialogDescription>
        </DialogHeader>
        <Form {...CreateStockForm}>
          <form
            className="grid gap-4"
            onSubmit={CreateStockForm.handleSubmit(onCreateStock)}
          >
            <FormField
              control={CreateStockForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Stock Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={CreateStockForm.control}
              name="default_buy_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buy Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Buy Price"
                      onChange={(event) => handleNumberInput({ field, event })}
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
                <FormItem>
                  <FormLabel>Sale Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Sale Price"
                      onChange={(event) => handleNumberInput({ field, event })}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={CreateStockForm.control}
              name="unit_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Unit" />
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
            <FormField
              control={CreateStockForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <MainButton
                disabled={!isValid || isCreatingStock}
                type="button"
                isLoading={isCreatingStock}
                loadingText="Creating Stock..."
                onClick={CreateStockForm.handleSubmit(onCreateStock)}
              >
                Create Stock
              </MainButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
