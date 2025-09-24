"use client";
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
import { PAYMENTS_TYPES } from "../../constants/invoice.constants";
import { useGetSingleInvoice } from "../../hooks/use-get-single-invoice";

export const InvoiceDetails = ({ id }: { id: string }) => {
	const { invoice } = useGetSingleInvoice({ id: id });

	if (!invoice) return null;

	const total = invoice.invoice_lines
		.reduce(
			(acc, curr) =>
				parseFloat(acc.toString()) +
				parseFloat(curr.rounding_amount.toString()),
			0
		)
		.toFixed(2);

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
						<div>
							{invoice.invoice_type === "0100000"
								? "Tax Invoice"
								: "Simplified Tax Invoice"}
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="text-main-gray">VAT Document: </div>
						<div>
							{invoice.invoice_type_code === "381"
								? "Credit Note"
								: invoice.invoice_type_code === "383"
								? "Debit Note"
								: "Tax Invoice"}
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="text-main-gray">Payment Type: </div>
						<div>
							{
								PAYMENTS_TYPES.find(
									payment =>
										payment.value.toString() ===
										invoice.payment_means_code.toString()
								)?.label
							}
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="text-main-gray">Tax Category: </div>
						<div>
							{invoice.classified_tax_category === "Z"
								? "Zero Tax"
								: invoice.classified_tax_category === "S"
								? "Applicable Tax"
								: "NA"}
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="text-main-gray">Delivery Date: </div>
						<div>{invoice.actual_delivery_date}</div>
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="text-main-gray">Issue Date: </div>
						<div>{invoice.issue_date}</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="text-main-gray">Issue Time: </div>
						<div>{invoice.issue_time}</div>
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
						<TableHead>Item Price</TableHead>
						<TableHead>Quantity</TableHead>
						<TableHead>Discount</TableHead>
						<TableHead>Tax Amount</TableHead>

						<TableHead>Subtotal Before Tax</TableHead>
						<TableHead className="text-right">Rounding Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{invoice.invoice_lines.map(invoiceLine => (
						<TableRow key={invoiceLine.item_id}>
							<TableCell className="font-medium">
								{invoiceLine.item_name}
							</TableCell>
							<TableCell>{invoiceLine.item_price}</TableCell>
							<TableCell>{invoiceLine.quantity}</TableCell>
							<TableCell>{invoiceLine.discount_amount}</TableCell>
							<TableCell>{invoiceLine.tax_amount}</TableCell>
							<TableCell>{invoiceLine.line_extension_amount}</TableCell>
							<TableCell className="text-right">
								SAR {invoiceLine.rounding_amount}
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

			{invoice.note ? (
				<div className="border p-8 rounded-2xl">
					<span className="font-bold text-lg">Note:</span> {invoice.note}
				</div>
			) : null}

			<div className="flex flex-col gap-4">
				<div className="font-bold text-3xl">Summary</div>
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<div>Discount Amount: </div>
						<div>SAR {invoice.discount_amount}</div>
					</div>
					<div className="flex items-center gap-2">
						<div>Taxable Amount: </div>
						<div>SAR {invoice.taxable_amount}</div>
					</div>
					<div className="flex items-center gap-2">
						<div>Subtotal Before Tax: </div>
						<div>SAR {invoice.line_extension_amount}</div>
					</div>
					<div className="flex items-center gap-2">
						<div>Tax Amount: </div>
						<div>SAR {invoice.tax_amount}</div>
					</div>
					<div className="flex items-center gap-2">
						<div>Tax Rate: </div>
						<div>%{invoice.tax_rate}</div>
					</div>
					<div className="flex items-center gap-2">
						<div>Inclusive Amount: </div>
						<div>SAR {invoice.tax_inclusive_amount}</div>
					</div>
				</div>
			</div>
		</div>
	);
};
