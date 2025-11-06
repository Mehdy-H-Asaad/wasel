import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MainButton } from "@/components/common/MainButton";
import Link from "next/link";

export const CreateSaleInvoiceDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MainButton>Create Sale Invoice</MainButton>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[425px] dark:bg-main-black">
        <DialogHeader>
          <DialogTitle>Create Sale Invoice</DialogTitle>
          <DialogDescription>
            Choose your invoice type to contiune.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 justify-between">
          <Link
            className="w-1/2"
            href={"/admin/sales/invoices/create-tax-invoice"}
          >
            <MainButton className="w-full">Tax Invoice</MainButton>
          </Link>
          <Link
            className="w-1/2"
            href={"/admin/sales/invoices/create-simplified-tax-invoice"}
          >
            <MainButton className="w-full">Simplified Tax Invoice</MainButton>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};
