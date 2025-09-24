import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import {
	INVOICE_IDS,
	TAX_EXEMPTION_REASONS_CODES,
	NO_TAX_RATE,
	PAYMENTS_TYPES,
	TAX_CATEGORIES,
	TAX_RATE,
	VAT_DOCUMENTS,
} from "@/features/invoice/constants/invoice.constants";

import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem,
} from "@/components/ui/select";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { TCreateSimplifiedTaxInvoiceDTO } from "@/features/invoice/schema/simplified-tax-invoice.schema";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { handleNumberInput } from "@/shared/utils/handle-number-input";

export const CreateSimplifiedTaxInvoiceOptions = () => {
	const form = useFormContext<TCreateSimplifiedTaxInvoiceDTO>();

	const VATDocuments = useWatch({
		control: form.control,
		name: "invoice_type_code",
	});

	const classified_tax_category = useWatch({
		control: form.control,
		name: "classified_tax_category",
	});

	return (
		<div className="flex flex-col dark:bg-main-black p-8 rounded-xl bg-[#fafafa]">
			<div className="flex justify-between items-center">
				<div className="text-2xl font-bold">Tax Invoice Options</div>
				<div className="w-fit self-end text-light-green font-bold text-lg border border-light-green py-1 px-4 rounded-full">
					Simplified Tax Invoice
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className=" grid grid-cols-4 gap-10 py-8 rounded-2xl">
					<FormField
						control={form.control}
						name="classified_tax_category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tax Category *</FormLabel>
								<Select
									onValueChange={value => {
										form.setValue(
											"tax_rate",
											value === "Z" ? NO_TAX_RATE : TAX_RATE
										);
										form.setValue("party_identification_scheme", "NAT");
										field.onChange(value);
									}}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full bg-white">
											<SelectValue placeholder="Tax Category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Tax Categories</SelectLabel>
											{TAX_CATEGORIES.map(tax => (
												<SelectItem
													value={tax.value.toString()}
													key={tax.value}
												>
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
					<FormField
						control={form.control}
						name="invoice_type_code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>VAT Documents *</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full bg-white">
											<SelectValue placeholder="VAT Document" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>VAT documents</SelectLabel>
											{VAT_DOCUMENTS.map(document => (
												<SelectItem
													value={document.value.toString()}
													key={document.value}
												>
													{document.label}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="payment_means_code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Payment Type *</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full bg-white">
											<SelectValue placeholder="Payment Type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Payment Types</SelectLabel>
											{PAYMENTS_TYPES.map(payment => (
												<SelectItem
													value={payment.value.toString()}
													key={payment.value}
												>
													{payment.label}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="actual_delivery_date"
						render={({ field }) => (
							<FormItem>
								<div className="flex flex-col gap-3">
									<FormLabel>Actual Delivery Date</FormLabel>
									<Popover>
										<FormControl>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													id="date"
													className="w-full justify-between font-normal"
												>
													{field.value
														? new Date(field.value).toLocaleDateString()
														: "Select date"}
													<ChevronDownIcon />
												</Button>
											</PopoverTrigger>
										</FormControl>
										<PopoverContent
											className="w-auto overflow-hidden p-0"
											align="start"
										>
											<Calendar
												mode="single"
												selected={
													field.value ? new Date(field.value) : undefined
												}
												captionLayout="dropdown"
												onSelect={date => {
													field.onChange(date?.toISOString().split("T")[0]);
												}}
											/>
										</PopoverContent>
									</Popover>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					{classified_tax_category === "Z" ? (
						<>
							<FormField
								control={form.control}
								name="registration_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Client Name *</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Client Name"
												className="bg-white"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="party_identification_value"
								render={({ field }) => (
									<FormItem>
										<FormLabel>National ID *</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="National ID"
												className="bg-white"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="tax_exemption_reason_code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tax Exemption Reason Code *</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full bg-white">
													<SelectValue placeholder="Tax Exemption Reason Code" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Tax Exemption Reason Code</SelectLabel>
													{TAX_EXEMPTION_REASONS_CODES.map(tax => (
														<SelectItem
															value={tax.value.toString()}
															key={tax.value}
														>
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
							<FormField
								control={form.control}
								name="tax_exemption_reason"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tax Exemption Reason *</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Tax Exemption Reason"
												className="bg-white"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					) : null}

					{VATDocuments === "381" || VATDocuments === "383" ? (
						<>
							<FormField
								control={form.control}
								name="original_invoice_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Invoice ID *</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full bg-white">
													<SelectValue placeholder="Invoice ID" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Invoice ID</SelectLabel>
													{INVOICE_IDS.map(invoice => (
														<SelectItem
															value={invoice.value.toString()}
															key={invoice.value}
														>
															{invoice.label}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="instruction_note"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Instruction Note *</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Instruction Note"
												className="bg-white"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					) : null}
					<FormField
						control={form.control}
						name="discount_amount"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Discount Amount</FormLabel>
								<FormControl>
									<Input
										{...field}
										value={field.value ?? ""}
										onChange={event => handleNumberInput({ event, field })}
										placeholder="Discount Amount"
										className="bg-white"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="note"
						render={({ field }) => (
							<FormItem className="col-span-4">
								<FormLabel>Note</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Note"
										className="h-40 bg-white"
									/>
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
