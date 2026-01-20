import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { useCreatePointOfSaleShortcut } from "../hooks/use-create-point-of-sale-shortcut";
import { MainButton } from "@/components/common/MainButton";
import { FieldValues, PathValue, UseFormReturn } from "react-hook-form";
import { Path } from "react-hook-form";

type TCreatePointOfSaleShortcutProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
};

export const CreatePointOfSaleShortcut = <T extends FieldValues>({
  form,
  name,
}: TCreatePointOfSaleShortcutProps<T>) => {
  const {
    pointOfSale,
    CreatePointOfSaleForm,
    onCreatePointOfSale,
    isCreatingPointOfSale,
    open,
    setOpen,
  } = useCreatePointOfSaleShortcut();
  const isValid = CreatePointOfSaleForm.formState.isValid;

  useEffect(() => {
    if (pointOfSale) {
      form.setValue(
        name as Path<T>,
        pointOfSale.data.id as PathValue<T, Path<T>>,
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointOfSale]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="capitalize w-fit flex items-center gap-1 text-light-green cursor-pointer rounded-lg border-2 border-light-green py-1 px-2 hover:bg-light-green/10 transition-all duration-300">
        <Plus className="h-4 w-4 text-light-green" />
        <span className="text-xs text-light-green">POS</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] dark:bg-main-black">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Point of Sale</DialogTitle>
          <DialogDescription>
            Create a new point of sale for your business
          </DialogDescription>
        </DialogHeader>
        <Form {...CreatePointOfSaleForm}>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              CreatePointOfSaleForm.handleSubmit(onCreatePointOfSale)(e);
            }}
          >
            <FormField
              control={CreatePointOfSaleForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    POS Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter POS name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-3 pt-4">
              <MainButton
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </MainButton>
              <MainButton
                disabled={!isValid || isCreatingPointOfSale}
                type="submit"
                isLoading={isCreatingPointOfSale}
                loadingText="Creating POS..."
              >
                Create POS
              </MainButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
