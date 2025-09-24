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

export const CreateInvoiceDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<MainButton>Create Invoice</MainButton>
			</DialogTrigger>
			<DialogContent className="sm:min-w-[425px] dark:bg-main-black">
				<DialogHeader>
					<DialogTitle>Create Invoice</DialogTitle>
					<DialogDescription>
						Choose your invoice type to contiune.
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center gap-4 justify-between">
					<Link className="w-1/2" href={"/admin/invoices/create-tax-invoice"}>
						<MainButton className="w-full">Tax Invoice</MainButton>
					</Link>
					<Link
						className="w-1/2"
						href={"/admin/invoices/create-simplified-tax-invoice"}
					>
						<MainButton className="w-full">Simplified Tax Invoice</MainButton>
					</Link>
				</div>
			</DialogContent>
		</Dialog>
	);
};
