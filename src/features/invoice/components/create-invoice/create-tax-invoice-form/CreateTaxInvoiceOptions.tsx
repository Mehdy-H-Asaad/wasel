import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import {
	clients,
	INVOICE_IDS,
	PAYMENTS_TYPES,
	TAX_CATEGORIES,
	VAT_DOCUMENTS,
} from "@/features/invoice/constants/invoice.constants";
import { TCreateTaxInvoiceDTO } from "@/features/invoice/schema/tax-invoice.schema";
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
import { useTaxInvoiceLineStore } from "@/features/invoice/store/tax-invoice-line.store";

export const CreateTaxInvoiceOptions = () => {
	const form = useFormContext<TCreateTaxInvoiceDTO>();
	const { removeAll } = useTaxInvoiceLineStore();
	const VATDocuments = useWatch({
		control: form.control,
		name: "InvoiceTypeCode",
	});

	return (
		<div className="flex flex-col gap-4 dark:bg-main-black p-8 rounded-xl bg-white">
			<div className="text-4xl font-bold">Tax Invoice Options</div>
			<div className="flex flex-col gap-4">
				<div className="border grid grid-cols-4 gap-10 p-8 rounded-2xl">
					<FormField
						control={form.control}
						name="BuyerInfo"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Client - Company *</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Client - Company" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Clients</SelectLabel>
											{clients.map(client => (
												<SelectItem
													value={client.value.toString()}
													key={client.value}
												>
													{client.label}
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
						name="InvoiceTypeCode"
						render={({ field }) => (
							<FormItem>
								<FormLabel>VAT Documents *</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
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
						name="PaymentMeansCode"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Payment Type *</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
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
						name="ClassifiedTaxCategory"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tax Category *</FormLabel>
								<Select
									onValueChange={value => {
										field.onChange(value);
										removeAll();
									}}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
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
						name="ActualDeliveryDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Delivery Date</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Delivery Date" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="Note"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Note</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Note" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{VATDocuments === "381" || VATDocuments === "383" ? (
						<>
							<FormField
								control={form.control}
								name="OriginalInvoiceID"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Invoice ID *</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full">
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
								name="InstructionNote"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Instruction Note *</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Instruction Note" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
};
