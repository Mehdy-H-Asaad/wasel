"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MainButton } from "@/components/common/MainButton";
import { CustomDialog } from "@/components/common/CustomDialog";
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectLabel,
	SelectGroup,
} from "@/components/ui/select";
import { TCreateTaxInvoiceDTO } from "@/features/invoice/schema/tax-invoice.schema";
import { UseFormReturn, useWatch } from "react-hook-form";
import { handleNumberInput } from "@/shared/utils/handle-number-input";
import {
	TCreateTaxInvoiceLineDTO,
	TUpdateTaxInvoiceLineDTO,
} from "@/features/invoice/schema/invoice-lines.schema";
import { useGetStocks } from "@/features/stock/hooks/useGetStock";
import {
	TAX_CATEGORIES,
	TAX_EXEMPTION_REASONS_CODES,
} from "@/features/invoice/constants/invoice.constants";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Package, Percent, FileText } from "lucide-react";

type TInvoiceLinesProps = {
	form: UseFormReturn<TCreateTaxInvoiceDTO>;
	invoiceLineForm: UseFormReturn<
		TCreateTaxInvoiceLineDTO | TUpdateTaxInvoiceLineDTO
	>;
	mutate: (values: TCreateTaxInvoiceLineDTO | TUpdateTaxInvoiceLineDTO) => void;
	trigger: string;
	title: string;
};
export const InvoiceLineDialog = ({
	invoiceLineForm,
	mutate,
	trigger,
	title,
}: TInvoiceLinesProps) => {
	const { stocks } = useGetStocks();

	const classified_tax_category = useWatch({
		control: invoiceLineForm.control,
		name: "classified_tax_category",
	});

	return (
		<CustomDialog
			dialogContentClassName="dark:bg-main-black !min-w-[50rem] overflow-y-auto max-h-[90vh]"
			title={title}
			trigger={trigger}
		>
			<Form {...invoiceLineForm}>
				<form
					className="space-y-4"
					onSubmit={invoiceLineForm.handleSubmit(values => {
						mutate(values);
						invoiceLineForm.reset();
					})}
				>
					{/* Item Details Section */}
					<div className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={invoiceLineForm.control}
								name="item_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-medium">
											Item <span className="text-destructive">*</span>
										</FormLabel>
										<Select
											// value={field.value.toString()}
											onValueChange={value => field.onChange(Number(value))}
											// disabled={!stocks}
											// value={field.value?.toString()}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select item" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Available Items</SelectLabel>
													{stocks?.map(stock => (
														<SelectItem
															key={stock.id}
															value={stock.id.toString()}
														>
															{stock.name}
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
								control={invoiceLineForm.control}
								name="quantity"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm font-medium">
											Quantity <span className="text-destructive">*</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												value={field.value ?? ""}
												onChange={event => handleNumberInput({ event, field })}
												placeholder="Enter quantity"
												className=""
												type="text"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={invoiceLineForm.control}
									name="classified_tax_category"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-sm font-medium">
												Tax Category <span className="text-destructive">*</span>
											</FormLabel>
											<Select
												onValueChange={value => field.onChange(value)}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger className=" w-full truncate">
														<SelectValue placeholder="Select tax category" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Tax Categories</SelectLabel>
														{TAX_CATEGORIES.map(taxRate => (
															<SelectItem
																key={taxRate.value}
																value={taxRate.value}
															>
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

								<FormField
									control={invoiceLineForm.control}
									name="discount_amount"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-sm font-medium">
												Discount Amount{" "}
												<span className="text-muted-foreground text-xs">
													(Optional)
												</span>
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													value={field.value ?? ""}
													onChange={event =>
														handleNumberInput({ event, field })
													}
													placeholder="0.00"
													className=""
													type="text"
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<FormField
							control={invoiceLineForm.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm font-medium">
										Description{" "}
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Add additional details about this item..."
											className="resize-none min-h-[80px]"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Tax Exemption Section - Conditional */}
					{(classified_tax_category === "Z" ||
						classified_tax_category === "O" ||
						classified_tax_category === "E") && (
						<>
							{/* <Separator /> */}
							<div className="space-y-4 rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-4">
								<div className="flex items-center gap-2 text-sm font-semibold text-amber-900 dark:text-amber-100">
									<FileText className="h-4 w-4" />
									<h3>Tax Exemption Details</h3>
								</div>
								<p className="text-xs text-amber-800 dark:text-amber-200">
									Since you've selected a zero-rated tax category, please
									provide exemption details
								</p>

								<div className="grid grid-cols-1 gap-4">
									<FormField
										control={invoiceLineForm.control}
										name="tax_exemption_reason_code"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-sm font-medium">
													Exemption Reason Code{" "}
													<span className="text-destructive">*</span>
												</FormLabel>
												<Select
													onValueChange={value => field.onChange(value)}
													value={field.value}
												>
													<FormControl>
														<SelectTrigger className=" bg-background">
															<SelectValue placeholder="Select exemption reason code" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectGroup>
															<SelectLabel>Exemption Codes</SelectLabel>
															{TAX_EXEMPTION_REASONS_CODES.map(tax => (
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
									{classified_tax_category === "O" && (
										<FormField
											control={invoiceLineForm.control}
											name="tax_exemption_reason"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="text-sm font-medium">
														Exemption Reason{" "}
														<span className="text-destructive">*</span>
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="Describe the reason for tax exemption"
															className=" bg-background"
														/>
													</FormControl>
													<FormDescription className="text-xs">
														Provide a clear explanation for the tax exemption
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
									)}
								</div>
							</div>
						</>
					)}

					<DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
						<MainButton
							className="w-full sm:w-auto min-w-[120px]"
							disabled={!invoiceLineForm.formState.isValid}
							type="submit"
						>
							{trigger}
						</MainButton>
					</DialogFooter>
				</form>
			</Form>
		</CustomDialog>
	);
};
