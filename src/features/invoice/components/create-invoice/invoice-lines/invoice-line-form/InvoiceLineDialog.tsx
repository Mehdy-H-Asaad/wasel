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
import { NAMES, UNITS } from "@/features/invoice/constants/invoice.constants";
import { InvoiceLineCalc } from "./InvoiceLineCalc";
import { handleNumberInput } from "@/shared/utils/handle-number-input";
import {
	TCreateTaxInvoiceLineDTO,
	TUpdateTaxInvoiceLineDTO,
} from "@/features/invoice/types/invoice.types";

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
	const { ClassifiedTaxCategory } = useWatch({
		control: form.control,
	});

	const isValid = invoiceLineForm.formState.isValid;
	const isDirty = invoiceLineForm.formState.isDirty;

	return (
		<CustomDialog
			dialogContentClassName="sm:min-w-[80rem] dark:bg-main-black"
			title={title}
			disabled={!ClassifiedTaxCategory}
			trigger={trigger}
		>
			<Form {...invoiceLineForm}>
				<form className="grid gap-4">
					<div className="grid grid-cols-4 gap-10">
						<FormField
							control={invoiceLineForm.control}
							name="Name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Item *</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Item" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Items</SelectLabel>
												{NAMES.map(item => (
													<SelectItem
														key={item.value}
														value={item.value.toString()}
													>
														{item.label}
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
							name={`BaseAmount`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Base Amount *</FormLabel>
									<Input
										{...field}
										value={field.value ?? ""}
										onChange={event =>
											handleNumberInput({ event, field, type: "string" })
										}
										placeholder="Base Amount"
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={invoiceLineForm.control}
							name={`InvoicedQuantity.unitCode`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Unit *</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value ?? ""}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Unit" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Units</SelectLabel>
												{UNITS.map(unit => (
													<SelectItem
														key={unit.value}
														value={unit.value.toString()}
													>
														{unit.label}
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
							name={`InvoicedQuantity.value`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Quantity *</FormLabel>
									<Input
										{...field}
										value={field.value ?? ""}
										onChange={event =>
											handleNumberInput({ event, field, type: "string" })
										}
										placeholder="Quantity"
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={invoiceLineForm.control}
							name={`DiscountAmount`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Discount Amount</FormLabel>
									<Input
										{...field}
										value={field.value ?? ""}
										onChange={event =>
											handleNumberInput({ event, field, type: "string" })
										}
										placeholder="Discount Amount"
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						{ClassifiedTaxCategory === "Z" ? (
							<>
								<FormField
									control={invoiceLineForm.control}
									name={`TaxExemptionReasonCode`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tax Exemption Reason Code *</FormLabel>
											<Input
												{...field}
												placeholder="Tax Exemption Reason Code"
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={invoiceLineForm.control}
									name={`TaxExemptionReason`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tax Exemption Reason *</FormLabel>
											<Input {...field} placeholder="Tax Exemption Reason" />
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						) : null}

						<InvoiceLineCalc
							classifiedTaxCategory={ClassifiedTaxCategory || "0"}
							form={invoiceLineForm}
						/>
					</div>
					<DialogFooter>
						<MainButton
							className="capitalize"
							disabled={!isValid || !isDirty}
							onClick={invoiceLineForm.handleSubmit(mutate)}
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
