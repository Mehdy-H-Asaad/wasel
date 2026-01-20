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
import { useCreatePointOfSale } from "../hooks/use-create-point-of-sale";
import { useEffect, useState } from "react";
import { MainButton } from "@/components/common/MainButton";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export const CreatePointOfSaleDialog = () => {
  const [open, setOpen] = useState(false);
  const {
    CreatePointOfSaleForm,
    onCreatePointOfSale,
    isCreatingPointOfSale,
    isCreateSuccess,
  } = useCreatePointOfSale();

  useEffect(() => {
    if (isCreateSuccess) {
      setOpen(false);
      CreatePointOfSaleForm.reset();
    }
  }, [isCreateSuccess, CreatePointOfSaleForm]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MainButton>
          <Plus className="h-4 w-4" />
          Add Point of Sale</MainButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Point of Sale</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Add a new point of sale to your business
        </DialogDescription>
        <Form {...CreatePointOfSaleForm}>
          <form
            className="grid gap-4"
            onSubmit={CreatePointOfSaleForm.handleSubmit(onCreatePointOfSale)}
          >
            <FormField
              control={CreatePointOfSaleForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    POS Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="POS Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <MainButton
              disabled={isCreatingPointOfSale}
              className="w-full mt-4"
              isLoading={isCreatingPointOfSale}
              loadingText="Creating..."
              type="submit"
            >
              Create Point of Sale
            </MainButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
