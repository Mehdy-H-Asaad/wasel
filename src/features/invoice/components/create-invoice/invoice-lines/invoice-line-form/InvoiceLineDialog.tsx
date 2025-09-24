"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
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
	form,
	invoiceLineForm,
	mutate,
	trigger,
	title,
}: TInvoiceLinesProps) => {
	const { stocks } = useGetStocks();

	const { classified_tax_category } = useWatch({
		control: form.control,
	});

	return (
		<CustomDialog
			dialogContentClassName=" dark:bg-main-black"
			title={title}
			disabled={!classified_tax_category}
			trigger={trigger}
		>
			<Form {...invoiceLineForm}>
				<form
					className="grid gap-4"
					onSubmit={invoiceLineForm.handleSubmit(values => {
						mutate(values);
						invoiceLineForm.reset();
					})}
				>
					<FormField
						control={invoiceLineForm.control}
						name="item_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Item *</FormLabel>
								<Select
									onValueChange={value => field.onChange(Number(value))}
									disabled={!stocks}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue
												placeholder={
													stocks?.find(stock => stock.id === field.value)
														?.name ?? "Select Item"
												}
											/>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Items</SelectLabel>
											{stocks?.map(stock => (
												<SelectItem key={stock.id} value={stock.id.toString()}>
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
						name={`quantity`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Quantity *</FormLabel>
								<Input
									{...field}
									value={field.value ?? ""}
									onChange={event => handleNumberInput({ event, field })}
									placeholder="Quantity"
								/>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={invoiceLineForm.control}
						name={`discount_amount`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Discount Amount</FormLabel>
								<Input
									{...field}
									value={field.value ?? ""}
									onChange={event => handleNumberInput({ event, field })}
									placeholder="Discount Amount"
								/>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* {classified_tax_category === "Z" ? (
						<>
							<FormField
								control={invoiceLineForm.control}
								name={`tax_exemption_reason_code`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tax Exemption Reason Code *</FormLabel>
										<Input {...field} placeholder="Tax Exemption Reason Code" />
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={invoiceLineForm.control}
								name={`tax_exemption_reason`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tax Exemption Reason *</FormLabel>
										<Input {...field} placeholder="Tax Exemption Reason" />
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					) : null} */}
					<DialogFooter>
						<MainButton
							className="capitalize"
							disabled={!invoiceLineForm.formState.isValid}
							onClick={invoiceLineForm.handleSubmit(values => {
								mutate(values);
							})}
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
