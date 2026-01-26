import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useUpdateSaleInvoiceStatus } from "../../../../hooks/sale-invoice/use-update-sale-invoice-status";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TInvoiceDTO } from "@/features/invoice/schema/invoice.schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MainButton } from "@/components/common/MainButton";
    
export const UpdateSaleInvoiceStatus = ({ invoice }: { invoice: TInvoiceDTO }) => {
    const [open, setOpen] = useState(false);
    const { UpdateSaleInvoiceStatusForm, onUpdateSaleInvoiceStatus, isUpdatingSaleInvoiceStatus } = useUpdateSaleInvoiceStatus({ invoiceId: String(invoice.id) });
    return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Send className="size-4" />
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to update the status?
        </DialogDescription>
        <Form {...UpdateSaleInvoiceStatusForm}>
          <form onSubmit={UpdateSaleInvoiceStatusForm.handleSubmit(onUpdateSaleInvoiceStatus)}>
            <FormField
              control={UpdateSaleInvoiceStatusForm.control}
              name="status"
                render={({ field }) => (
                <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ISSUED">Issued</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
                )}
              />
            <DialogFooter>
              <MainButton type="submit" disabled={isUpdatingSaleInvoiceStatus} isLoading={isUpdatingSaleInvoiceStatus} loadingText="Updating Sale Invoice Status">
                Update Status
              </MainButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
