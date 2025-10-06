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
import { useCreateSupplier } from "../../hooks/use-create-supplier";
import { CLIENT_IDENTIFCATIONS } from "@/features/clients/constants/client.constant";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export const CreateSupplier = () => {
	const { CreateSupplierForm, isCreatingSupplier, onCreateSupplier } =
		useCreateSupplier();
	const isValid = CreateSupplierForm.formState.isValid;

	return (
		<CustomDialog
			dialogContentClassName="sm:min-w-[60rem] dark:bg-main-black"
			title="suppliers"
			trigger="Add Supplier"
			isMainButton
		>
			<Form {...CreateSupplierForm}>
				<form
					className="grid gap-4"
					onSubmit={CreateSupplierForm.handleSubmit(onCreateSupplier)}
				>
					<div className="grid grid-cols-3 gap-6">
						<FormField
							control={CreateSupplierForm.control}
							name="registration_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Supplier - Company <span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Supplier - Company" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={CreateSupplierForm.control}
							name="party_identification_scheme"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Supplier Identification</FormLabel>
									<Select
										defaultValue={field.value}
										onValueChange={field.onChange}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Supplier Identification" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Supplier Identifications</SelectLabel>
												{CLIENT_IDENTIFCATIONS.map(supplier => (
													<SelectItem
														key={supplier.value}
														value={supplier.value}
													>
														{supplier.label}
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
							control={CreateSupplierForm.control}
							name="party_identification_value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Identification Value</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={
												!CreateSupplierForm.watch("party_identification_scheme")
											}
											placeholder="Identification Value"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={CreateSupplierForm.control}
							name="vat_number"
							render={({ field }) => (
								<FormItem>
									<FormLabel>VAT Number</FormLabel>
									<FormControl>
										<Input {...field} placeholder="VAT Number" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={CreateSupplierForm.control}
							name="bank_account"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bank Account</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Bank Account" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={CreateSupplierForm.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Phone" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={CreateSupplierForm.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input {...field} placeholder="City" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={CreateSupplierForm.control}
							name="division"
							render={({ field }) => (
								<FormItem>
									<FormLabel>District</FormLabel>
									<FormControl>
										<Input {...field} placeholder="District" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={CreateSupplierForm.control}
							name="street"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Street</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Street" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={CreateSupplierForm.control}
							name="building_number"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Building Number</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Building Number" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={CreateSupplierForm.control}
							name="postal_code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Postal Code</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Postal Code" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={CreateSupplierForm.control}
							name="notes"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Note</FormLabel>
									<FormControl>
										<Textarea {...field} placeholder="Note" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<DialogFooter>
						<MainButton
							className="flex items-center gap-2"
							isLoading={isCreatingSupplier}
							loadingText="Creating Supplier..."
							disabled={!isValid || isCreatingSupplier}
						>
							<Plus className="w-4 h-4" />
							Add Supplier
						</MainButton>
					</DialogFooter>
				</form>
			</Form>
		</CustomDialog>
	);
};
