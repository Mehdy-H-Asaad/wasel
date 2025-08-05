"use client";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TAX_RATE } from "@/features/invoice/constants/invoice.constants";
import { TCreateTaxInvoiceDTO } from "@/features/invoice/schema/tax-invoice.schema";
import { useTaxInvoiceLineStore } from "@/features/invoice/store/tax-invoice-line.store";
import { handleNumberInput } from "@/shared/utils/handle-number-input";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export const TaxInvoiceCalculations = () => {
	const { invoiceLines } = useTaxInvoiceLineStore();
	const form = useFormContext<TCreateTaxInvoiceDTO>();

	const DiscountAmount = useWatch({
		control: form.control,
		name: "DiscountAmount",
	});

	const ClassifiedTaxCategory = useWatch({
		control: form.control,
		name: "ClassifiedTaxCategory",
	});

	useEffect(() => {
		if (ClassifiedTaxCategory === "S") {
			form.setValue("TaxRate", TAX_RATE);
		} else {
			form.setValue("TaxRate", "0");
		}

		const totalLineExtensionAmount = invoiceLines.reduce(
			(acc, line) => acc + parseFloat(line.LineExtensionAmount || "0"),
			0
		);

		const totalTaxableAmount =
			totalLineExtensionAmount - parseFloat(DiscountAmount || "0");

		const totalTaxAmount = invoiceLines.reduce(
			(acc, line) => acc + parseFloat(line.TaxAmount || "0"),
			0
		);
		const totalTaxInclusiveAmount = totalTaxableAmount + totalTaxAmount;
		const totalPayableAmount = totalTaxInclusiveAmount;

		form.setValue("LineExtensionAmount", totalLineExtensionAmount.toFixed(2));
		form.setValue("TaxableAmount", totalTaxableAmount.toFixed(2));
		form.setValue("TaxAmount", totalTaxAmount.toFixed(2));
		form.setValue("TaxInclusiveAmount", totalTaxInclusiveAmount.toFixed(2));
		form.setValue("PayableAmount", totalPayableAmount.toFixed(2));
	}, [invoiceLines, form, DiscountAmount, ClassifiedTaxCategory]);

	return (
		<div className="flex flex-col gap-4 dark:bg-main-black p-8 rounded-xl bg-white">
			<div className="text-4xl font-bold">Tax Invoice Summary</div>
			<div className="flex flex-col gap-4">
				<div className="border grid grid-cols-4 gap-10 p-8 rounded-2xl">
					<FormField
						control={form.control}
						name="DiscountAmount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Discount Amount</FormLabel>
								<FormControl>
									<Input
										{...field}
										value={field.value ?? ""}
										onChange={event =>
											handleNumberInput({ event, field, type: "string" })
										}
										placeholder="Discount Amount"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="LineExtensionAmount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Subtotal Before Tax</FormLabel>
								<FormControl>
									<Input
										disabled
										{...field}
										value={field.value ?? ""}
										onChange={event =>
											handleNumberInput({ event, field, type: "string" })
										}
										placeholder="Subtotal Before Tax"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="TaxableAmount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Taxable Amount</FormLabel>
								<FormControl>
									<Input {...field} disabled placeholder="Taxable Amount" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="TaxRate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tax Rate</FormLabel>
								<FormControl>
									<Input {...field} disabled placeholder="Tax Rate" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="TaxAmount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tax Amount</FormLabel>
								<FormControl>
									<Input {...field} disabled placeholder="Tax Amount" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="TaxInclusiveAmount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tax Inclusive Amount</FormLabel>
								<FormControl>
									<Input
										disabled
										{...field}
										placeholder="Tax Inclusive Amount"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="IssueDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Issue Date</FormLabel>
								<FormControl>
									<Input {...field} disabled placeholder="Issue Date" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="IssueTime"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Issue Time</FormLabel>
								<FormControl>
									<Input {...field} disabled placeholder="Issue Time" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
		</div>
	);
};
