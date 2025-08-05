"use client";
import { UseFormReturn } from "react-hook-form";
import { TCreateTaxInvoiceDTO } from "../../schema/tax-invoice.schema";
import {
	Table,
	TableCaption,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	TableFooter,
} from "@/components/ui/table";
import { useTaxInvoiceLineStore } from "../../store/tax-invoice-line.store";
import { TCreateSimplifiedTaxInvoiceDTO } from "../../schema/simplified-tax-invoice.schema";

type TInvoiceDetailsProps = {
	form:
		| UseFormReturn<TCreateTaxInvoiceDTO>
		| UseFormReturn<TCreateSimplifiedTaxInvoiceDTO>;
};

export const InvoiceDetails = ({ form }: TInvoiceDetailsProps) => {
	const invoice = form.getValues();

	const { invoiceLines } = useTaxInvoiceLineStore();

	const total = parseFloat(
		invoiceLines
			.reduce((acc, curr) => acc + parseFloat(curr.RoundingAmount || "0"), 0)
			.toString()
	).toFixed(2);

	return (
		<div className="flex flex-col gap-y-10 dark:bg-main-black p-8 rounded-xl bg-white">
			<div className="flex items-center justify-between ">
				<div className="font-bold text-5xl">TAX INVOICE</div>
				<div className="text-light-green font-bold text-lg border border-light-green py-1 px-4 rounded-full">
					Tax Invoice
				</div>
			</div>
			<hr />

			<div className="grid grid-cols-3 gap-y-10 gap-x-20">
				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="text-main-gray">Issued for: </div>
						<div>Sami Jneidy</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="text-main-gray">Invoice Type: </div>
						<div>{invoice.InvoiceType}</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="text-main-gray">VAT Document: </div>
						<div>
							{invoice.InvoiceTypeCode === "381"
								? "Credit Note"
								: invoice.InvoiceTypeCode === "383"
								? "Debit Note"
								: "Tax Invoice"}
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="text-main-gray">Payment Type: </div>
						<div>
							{invoice.PaymentMeansCode === "1"
								? "Payment Type A"
								: "Payment Type B"}
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="text-main-gray">Tax Category: </div>
						<div>
							{invoice.ClassifiedTaxCategory === "Z"
								? "Zero Tax"
								: invoice.ClassifiedTaxCategory === "S"
								? "Applicable Tax"
								: "NA"}
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="text-main-gray">Delivery Date: </div>
						<div>{invoice.ActualDeliveryDate}</div>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="text-main-gray">Issue Date: </div>
						<div>{invoice.IssueDate}</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="text-main-gray">Issue Time: </div>
						<div>{invoice.IssueTime}</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="text-main-gray">Currency: </div>
						<div>SAR</div>
					</div>
				</div>
			</div>

			<hr />

			<Table className="mt-8 border">
				<TableCaption>A list of your invoice lines.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Item</TableHead>
						<TableHead>Base Price</TableHead>
						<TableHead>Unit</TableHead>
						<TableHead className="text-right">Quantity</TableHead>
						<TableHead className="text-right">Tax Amount</TableHead>
						<TableHead className="text-right">Discount Amount</TableHead>
						<TableHead className="text-right">Rounding Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{invoiceLines.map(invoice => (
						<TableRow key={invoice.Name}>
							<TableCell className="font-medium">{invoice.Name}</TableCell>
							<TableCell>{invoice.BaseAmount}</TableCell>
							<TableCell>{invoice.InvoicedQuantity.unitCode}</TableCell>
							<TableCell className="text-right">
								{invoice.InvoicedQuantity.value}
							</TableCell>
							<TableCell className="text-right">{invoice.TaxAmount}</TableCell>
							<TableCell className="text-right">
								{invoice.DiscountAmount}
							</TableCell>
							<TableCell className="text-right">
								SAR {invoice.RoundingAmount}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={6}>Total</TableCell>
						<TableCell className="text-right">SAR {total}</TableCell>
					</TableRow>
				</TableFooter>
			</Table>

			{invoice.Note ? (
				<div className="border p-8 rounded-2xl">
					<span className="font-bold text-lg">Note:</span> {invoice.Note}
				</div>
			) : null}

			<div className="flex flex-col gap-4">
				<div className="font-bold text-3xl">Summary</div>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<div>Subtotal Before Tax: </div>
						<div>SAR {invoice.LineExtensionAmount}</div>
					</div>
					<div className="flex items-center gap-2">
						<div>Tax Amount: </div>
						<div>SAR {invoice.TaxAmount}</div>
					</div>
					<div className="flex items-center gap-2">
						<div>Tax Rate: </div>
						<div>%{invoice.TaxRate}</div>
					</div>
					<div className="flex items-center gap-2">
						<div>Inclusive Amount: </div>
						<div>SAR {invoice.TaxInclusiveAmount}</div>
					</div>
				</div>
			</div>
		</div>
	);
};
