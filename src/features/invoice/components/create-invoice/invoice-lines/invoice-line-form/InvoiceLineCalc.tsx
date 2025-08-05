import {
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TAX_RATE } from "@/features/invoice/constants/invoice.constants";
import { TCreateTaxInvoiceLineDTO } from "@/features/invoice/types/invoice.types";
import React, { useEffect } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

export type TCreateTaxInvoiceLineCalc = {
	form: UseFormReturn<TCreateTaxInvoiceLineDTO>;
	classifiedTaxCategory: string;
};

export const InvoiceLineCalc = ({
	form,
	classifiedTaxCategory,
}: TCreateTaxInvoiceLineCalc) => {
	const {
		TaxAmount,
		LineExtensionAmount,
		BaseAmount,
		RoundingAmount,
		InvoicedQuantity,
		DiscountAmount,
	} = useWatch({
		control: form.control,
	});

	useEffect(() => {
		if (classifiedTaxCategory === "S" && LineExtensionAmount)
			form.setValue(
				"TaxAmount",
				(parseFloat(LineExtensionAmount) * (parseFloat(TAX_RATE) / 100))
					.toFixed(2)
					.toString()
			);
		else if (classifiedTaxCategory === "Z" && LineExtensionAmount)
			form.setValue("TaxAmount", parseFloat("0").toFixed(2).toString());

		form.setValue(
			"LineExtensionAmount",
			(
				parseFloat(BaseAmount || "0") *
					parseFloat(InvoicedQuantity?.value || "1") -
				parseFloat(DiscountAmount || "0")
			)
				.toFixed(2)
				.toString()
		);
		form.setValue(
			"RoundingAmount",
			(parseFloat(LineExtensionAmount || "0") + parseFloat(TaxAmount || "0"))
				.toFixed(2)
				.toString()
		);
	}, [
		TaxAmount,
		LineExtensionAmount,
		BaseAmount,
		RoundingAmount,
		InvoicedQuantity?.value,
		DiscountAmount,
		classifiedTaxCategory,
		form,
	]);

	return (
		<>
			<FormField
				control={form.control}
				name={`LineExtensionAmount`}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Subtotal Before Tax</FormLabel>
						<Input {...field} disabled placeholder="Subtotal Before Tax" />
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name={`TaxAmount`}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Tax Amount</FormLabel>
						<Input {...field} disabled placeholder="Tax Amount" />
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name={`RoundingAmount`}
				render={({ field }) => (
					<FormItem>
						<FormLabel>Rounding Amount</FormLabel>
						<Input {...field} disabled placeholder="Rounding Amount" />
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};
