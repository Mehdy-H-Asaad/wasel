"use client";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { TCreateSaleTaxInvoiceDTO } from "@/features/invoice/schema/sale-tax-invoice.schema";
import { TableCell, TableRow } from "@/components/ui/table";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
	TAX_CATEGORIES,
	TAX_EXEMPTION_REASONS_CODES,
} from "@/features/invoice/constants/invoice.constants";
import { handleNumberInput } from "@/shared/utils/handle-number-input";
import { FormatRiyal } from "@/components/common/format-riyal";
import { calculateInvoiceLines } from "@/features/invoice/utils/calculate-invoice-lines";
import { CreateStockShortcut } from "@/features/stock/components/create-stock-shortcut";
import { useGetStocks } from "@/features/stock/hooks/useGetStock";
import { AsyncSelectFormField } from "@/components/common/select/async-select-form-field";

type InvoiceLineRowProps = {
	index: number;
	onRemove: () => void;
	showExemptionCode: boolean;
	showExemptionReason: boolean;
};

export const InvoiceLineRow = ({
	index,
	onRemove,
	showExemptionCode,
	showExemptionReason,
}: InvoiceLineRowProps) => {
	const form = useFormContext<TCreateSaleTaxInvoiceDTO>();
	const [itemSearch, setItemSearch] = React.useState("");

	const classifiedTaxCategory = useWatch({
		control: form.control,
		name: `invoice_lines.${index}.classified_tax_category`,
	});

	const itemId = useWatch({
		control: form.control,
		name: `invoice_lines.${index}.item_id`,
	});

	const { stocks, isLoadingStocks } = useGetStocks({
		filters: {
			name: itemSearch,
			limit: 30,
			page: 1,
		},
	});

	// Auto-populate item price when an item is selected
	useEffect(() => {
		if (itemId && stocks && stocks.length > 0) {
			const selectedStock = stocks.find(stock => stock.id.toString() === itemId.toString());
			if (selectedStock) {
				form.setValue(
					`invoice_lines.${index}.item_price`,
					Number(selectedStock.default_sale_price),
				);
			}
		}
	}, [itemId, stocks, form, index]);

	const showTaxExemption =
		classifiedTaxCategory === "Z" ||
		classifiedTaxCategory === "O" ||
		classifiedTaxCategory === "E";

	const invoiceLine = useWatch({
		control: form.control,
		name: `invoice_lines.${index}`,
	});

	const pricesIncludeTax = useWatch({
		control: form.control,
		name: "prices_include_tax",
	});

	// useEffect(() => {
	// 	if (
	// 		classifiedTaxCategory === "Z" ||
	// 		classifiedTaxCategory === "E" ||
	// 		classifiedTaxCategory === "O"
	// 	) {
	// 		const reason = TAX_EXEMPTION_REASONS_CODES.find(
	// 			tax => tax.case === classifiedTaxCategory
	// 		)?.options.find(
	// 			tax => tax.value === invoiceLine.tax_exemption_reason_code
	// 		)?.label;

	// 		form.setValue(`invoice_lines.${index}.tax_exemption_reason`, reason);
	// 	}
	// }, [classifiedTaxCategory, form, index, invoiceLine]);

	const handleExemptionCodeChange = (value: string) => {
		// Set the code
		form.setValue(`invoice_lines.${index}.tax_exemption_reason_code`, value);

		// Auto-populate the reason label for Z and E categories
		// Category O allows manual input, so we don't auto-populate it
		if (classifiedTaxCategory !== "O") {
			const reason = TAX_EXEMPTION_REASONS_CODES.find(
				tax => tax.case === classifiedTaxCategory
			)?.options.find(tax => tax.value === value)?.label;

			form.setValue(
				`invoice_lines.${index}.tax_exemption_reason`,
				reason || null
			);
		}
	};

	const { lineExtensionAmount, taxAmount, roundingAmount } =
		calculateInvoiceLines(invoiceLine, classifiedTaxCategory, pricesIncludeTax);

	return (
		<TableRow className="hover:bg-muted/30">
			{/* Actions */}
			<TableCell className="text-center">
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={onRemove}
					className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</TableCell>
			<TableCell>
				<FormField
					control={form.control}
					name={`invoice_lines.${index}.item_id`}
					render={() => (
						<FormItem className="flex items-center justify-between gap-2">
							<AsyncSelectFormField
								form={form}
								name={`invoice_lines.${index}.item_id`}
								options={
									stocks?.map(stock => ({
										label: stock.name,
										value: stock.id,
									})) ?? []
								}
								isLoading={isLoadingStocks}
								placeholder="Select item..."
								onSearch={setItemSearch}
							/>
							<CreateStockShortcut
								form={form}
								name={`invoice_lines.${index}.item_id`}
								onStockCreated={() => setItemSearch("")}
							/>
							<FormMessage />
						</FormItem>
					)}
				/>
			</TableCell>

			{/* Price */}
			<TableCell>
				<FormField
					control={form.control}
					name={`invoice_lines.${index}.item_price`}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									value={field.value ?? ""}
									onChange={event => handleNumberInput({ event, field })}
									placeholder="0"
									type="text"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</TableCell>

			{/* Quantity */}
			<TableCell>
				<FormField
					control={form.control}
					name={`invoice_lines.${index}.quantity`}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									value={field.value ?? ""}
									onChange={event => handleNumberInput({ event, field })}
									placeholder="0"
									type="text"
									className="w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</TableCell>

			{/* Tax Category */}
			<TableCell>
				<FormField
					control={form.control}
					name={`invoice_lines.${index}.classified_tax_category`}
					render={({ field }) => (
						<FormItem>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select tax" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Tax Categories</SelectLabel>
										{TAX_CATEGORIES.map(taxRate => (
											<SelectItem key={taxRate.value} value={taxRate.value}>
												{taxRate.label}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</TableCell>

			{/* Tax Exemption Code - Only show if columns are visible */}
			{showExemptionCode && (
				<TableCell>
					{showTaxExemption ? (
						<FormField
							control={form.control}
							name={`invoice_lines.${index}.tax_exemption_reason_code`}
							render={({ field }) => (
								<FormItem>
									<Select
										onValueChange={handleExemptionCodeChange}
										value={field.value ?? ""}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select code" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Exemption Codes</SelectLabel>
												{TAX_EXEMPTION_REASONS_CODES.find(
													tax => tax.case === classifiedTaxCategory
												)?.options.map(tax => (
													<SelectItem key={tax.value} value={tax.value}>
														{tax.label}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					) : (
						<div className="text-muted-foreground text-sm">-</div>
					)}
				</TableCell>
			)}

			{/* Tax Exemption Reason - Only show if columns are visible and category is O */}
			{showExemptionReason && (
				<TableCell>
					{classifiedTaxCategory === "O" ? (
						<FormField
							control={form.control}
							name={`invoice_lines.${index}.tax_exemption_reason`}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											placeholder="Describe reason..."
											className="w-full"
											value={field.value ?? ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					) : (
						<div className="text-muted-foreground text-sm">-</div>
					)}
				</TableCell>
			)}
			<TableCell>
				<FormField
					control={form.control}
					name={`invoice_lines.${index}.discount_amount`}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									value={field.value ?? ""}
									onChange={event => handleNumberInput({ event, field })}
									placeholder="0.00"
									type="text"
									className="w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</TableCell>
			{/* Sub Total */}
			<TableCell>
				<FormatRiyal value={lineExtensionAmount} />
			</TableCell>

			{/* Tax */}
			<TableCell>
				<FormatRiyal value={taxAmount} />
			</TableCell>

			{/* Total */}
			<TableCell>
				<FormatRiyal value={roundingAmount} />
			</TableCell>

			{/* Description */}
			<TableCell>
				<FormField
					control={form.control}
					name={`invoice_lines.${index}.description`}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									placeholder="Add description..."
									className="w-full"
									value={field.value ?? ""}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</TableCell>
		</TableRow>
	);
};
