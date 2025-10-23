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
import { TCreateSimplifiedTaxInvoiceDTO } from "../../schema/simplified-tax-invoice.schema";
import { PAYMENTS_TYPES } from "../../constants/invoice.constants";
import { useInvoiceLineStore } from "../../store/invoice-line.store";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	FileText,
	Calendar,
	DollarSign,
	CreditCard,
	Building2,
} from "lucide-react";

type TInvoicePreviewProps = {
	form:
		| UseFormReturn<TCreateTaxInvoiceDTO>
		| UseFormReturn<TCreateSimplifiedTaxInvoiceDTO>;
};

export const InvoicePreview = ({ form }: TInvoicePreviewProps) => {
	const invoice = form.getValues();

	const { invoiceLinesTable } = useInvoiceLineStore();

	const total = invoiceLinesTable
		.reduce((acc, curr) => acc + (curr.roundingAmount || 0), 0)
		.toFixed(2);

	return (
		<Card className="border-2">
			<CardContent className="p-8 space-y-8">
				{/* Invoice Header */}
				<div className="flex items-start justify-between">
					<div>
						<h1 className="font-bold text-4xl mb-2 text-light-green">
							TAX INVOICE
						</h1>
						<p className="text-sm text-muted-foreground">
							Preview your invoice before submission
						</p>
					</div>
					<div className="text-light-green font-bold text-sm border-2 border-light-green py-2 px-6 rounded-full bg-light-green/5">
						{invoice.invoice_type === "0100000"
							? "Tax Invoice"
							: "Simplified Tax Invoice"}
					</div>
				</div>
				<Separator />

				{/* Invoice Details Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Column 1 - Client Information */}
					<Card className="bg-muted/30">
						<CardHeader className="pb-3">
							<div className="flex items-center gap-2">
								<Building2 className="h-4 w-4 text-light-green" />
								<CardTitle className="text-sm">Client Details</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-3 text-sm">
							<div>
								<div className="text-muted-foreground text-xs">Issued for</div>
								<div className="font-semibold">Sami Jneidy</div>
							</div>
							<div>
								<div className="text-muted-foreground text-xs">
									Invoice Type
								</div>
								<div className="font-semibold">
									{invoice.invoice_type === "0100000"
										? "Tax Invoice"
										: "Simplified Tax Invoice"}
								</div>
							</div>
							<div>
								<div className="text-muted-foreground text-xs">
									VAT Document
								</div>
								<div className="font-semibold">
									{invoice.invoice_type_code === "381"
										? "Credit Note"
										: invoice.invoice_type_code === "383"
										? "Debit Note"
										: "Tax Invoice"}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Column 2 - Payment Information */}
					<Card className="bg-muted/30">
						<CardHeader className="pb-3">
							<div className="flex items-center gap-2">
								<CreditCard className="h-4 w-4 text-light-green" />
								<CardTitle className="text-sm">Payment Details</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-3 text-sm">
							<div>
								<div className="text-muted-foreground text-xs">
									Payment Method
								</div>
								<div className="font-semibold">
									{
										PAYMENTS_TYPES.find(
											payment =>
												payment.value.toString() ===
												invoice.payment_means_code.toString()
										)?.label
									}
								</div>
							</div>
							<div>
								<div className="text-muted-foreground text-xs">
									Tax Category
								</div>
								<div className="font-semibold">
									{invoice.classified_tax_category === "Z"
										? "Zero Tax"
										: invoice.classified_tax_category === "S"
										? "Applicable Tax"
										: "NA"}
								</div>
							</div>
							<div>
								<div className="text-muted-foreground text-xs">
									Delivery Date
								</div>
								<div className="font-semibold">
									{invoice.actual_delivery_date || "N/A"}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Column 3 - Date Information */}
					<Card className="bg-muted/30">
						<CardHeader className="pb-3">
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-light-green" />
								<CardTitle className="text-sm">Invoice Dates</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-3 text-sm">
							<div>
								<div className="text-muted-foreground text-xs">Issue Date</div>
								<div className="font-semibold">{invoice.issue_date}</div>
							</div>
							<div>
								<div className="text-muted-foreground text-xs">Issue Time</div>
								<div className="font-semibold">{invoice.issue_time}</div>
							</div>
							<div>
								<div className="text-muted-foreground text-xs">Currency</div>
								<div className="font-semibold">SAR (Saudi Riyal)</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<Separator />

				{/* Line Items Table */}
				<div>
					<h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
						<FileText className="h-5 w-5 text-light-green" />
						Invoice Line Items
					</h3>
					<div className="border rounded-lg overflow-hidden">
						<Table>
							<TableHeader>
								<TableRow className="bg-muted/50">
									<TableHead className="font-semibold">Item</TableHead>
									<TableHead className="font-semibold">Price</TableHead>
									<TableHead className="font-semibold">Qty</TableHead>
									<TableHead className="font-semibold">Discount</TableHead>
									<TableHead className="font-semibold">Subtotal</TableHead>
									<TableHead className="font-semibold">Tax</TableHead>
									<TableHead className="text-right font-semibold">
										Total
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{invoiceLinesTable.length > 0 ? (
									invoiceLinesTable.map(invoiceLine => (
										<TableRow key={invoiceLine.item_id}>
											<TableCell className="font-medium">
												{invoiceLine.item_name}
											</TableCell>
											<TableCell>
												{invoiceLine.item_price.toFixed(2)} SAR
											</TableCell>
											<TableCell>{invoiceLine.quantity.toFixed(2)}</TableCell>
											<TableCell>
												{invoiceLine.discount_amount?.toFixed(2) || "0.00"} SAR
											</TableCell>
											<TableCell>
												{invoiceLine.lineExtensionAmount.toFixed(2)} SAR
											</TableCell>
											<TableCell>
												{invoiceLine.taxAmount.toFixed(2)} SAR
											</TableCell>
											<TableCell className="text-right font-semibold">
												{invoiceLine.roundingAmount.toFixed(2)} SAR
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell
											colSpan={7}
											className="text-center text-muted-foreground py-8"
										>
											No line items added yet
										</TableCell>
									</TableRow>
								)}
							</TableBody>
							<TableFooter>
								<TableRow className="bg-light-green/10">
									<TableCell colSpan={6} className="font-bold text-lg">
										Grand Total
									</TableCell>
									<TableCell className="text-right font-bold text-lg text-light-green">
										{total} SAR
									</TableCell>
								</TableRow>
							</TableFooter>
						</Table>
					</div>
				</div>

				{/* Summary Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Financial Summary */}
					<Card className="bg-light-green/5 border-light-green/20">
						<CardHeader>
							<div className="flex items-center gap-2">
								<DollarSign className="h-5 w-5 text-light-green" />
								<CardTitle className="text-base">Financial Summary</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex justify-between items-center">
								<span className="text-sm text-muted-foreground">
									Subtotal Before Tax
								</span>
								<span className="font-semibold">
									{invoiceLinesTable
										.reduce(
											(acc, curr) => acc + (curr.lineExtensionAmount || 0),
											0
										)
										.toFixed(2)}{" "}
									SAR
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm text-muted-foreground">
									Tax Amount ({invoice.tax_rate}%)
								</span>
								<span className="font-semibold">
									{invoiceLinesTable
										.reduce((acc, curr) => acc + (curr.taxAmount || 0), 0)
										.toFixed(2)}{" "}
									SAR
								</span>
							</div>
							<Separator />
							<div className="flex justify-between items-center">
								<span className="font-bold">Total Amount</span>
								<span className="font-bold text-light-green text-lg">
									{total} SAR
								</span>
							</div>
						</CardContent>
					</Card>

					{/* Additional Notes */}
					{invoice.note ? (
						<Card className="bg-muted/30">
							<CardHeader>
								<div className="flex items-center gap-2">
									<FileText className="h-5 w-5 text-light-green" />
									<CardTitle className="text-base">Additional Notes</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{invoice.note}
								</p>
							</CardContent>
						</Card>
					) : null}
				</div>
			</CardContent>
		</Card>
	);
};
