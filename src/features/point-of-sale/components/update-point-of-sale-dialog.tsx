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
import { useUpdatePointOfSale } from "../hooks/use-update-point-of-sale";
import { useEffect, useState } from "react";
import { MainButton } from "@/components/common/MainButton";
import { TPointOfSaleDTO } from "../schema/point-of-sale.schema";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export const UpdatePointOfSaleDialog = ({
  pointOfSale,
}: {
  pointOfSale: TPointOfSaleDTO;
}) => {
  const [open, setOpen] = useState(false);
  const {
    UpdatePointOfSaleForm,
    onUpdatePointOfSale,
    isUpdatingPointOfSale,
    isUpdateSuccess,
  } = useUpdatePointOfSale({ pointOfSale });

  useEffect(() => {
    if (isUpdateSuccess) {
      setOpen(false);
    }
  }, [isUpdateSuccess]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Update Point of Sale</Button>
      </DialogTrigger>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>Update Point of Sale</DialogTitle>

        </DialogHeader>
        <DialogDescription>
          Make changes to your <span className="capitalize">point of sale</span> here. Click <span className="capitalize">update point of sale</span> when you&apos;re done.
        </DialogDescription>

        <Form {...UpdatePointOfSaleForm}>
          <form
            className="grid gap-4"
            onSubmit={UpdatePointOfSaleForm.handleSubmit(onUpdatePointOfSale)}
          >
            <FormField
              control={UpdatePointOfSaleForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter point of sale name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <MainButton
              disabled={isUpdatingPointOfSale}
              className="w-full mt-4"
              isLoading={isUpdatingPointOfSale}
              loadingText="Updating..."
              type="submit"
            >
              <Save className="h-4 w-4" />
              Update Point of Sale
            </MainButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
