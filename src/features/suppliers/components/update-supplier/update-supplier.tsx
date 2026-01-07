"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MainButton } from "@/components/common/MainButton";
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectLabel,
	SelectGroup,
} from "@/components/ui/select";
import { useUpdateSupplier } from "../../hooks/use-update-supplier";
import { CLIENT_IDENTIFCATIONS } from "@/features/clients/constants/client.constant";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Building2 } from "lucide-react";
import { useGetSingleSupplier } from "../../hooks/use-get-single-supplier";

export const UpdateSupplier = ({ supplierId }: { supplierId: string }) => {
	const router = useRouter();
	const { supplier, isLoadingSupplier: isLoading } = useGetSingleSupplier({
		id: supplierId,
	});
	const { UpdateSupplierForm, isUpdatingSupplier, onUpdateSupplier } =
		useUpdateSupplier({ supplier });
	const isValid = UpdateSupplierForm.formState.isValid;

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-lg">Loading supplier data...</div>
			</div>
		);
	}

	if (!supplier) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-lg">Supplier not found</div>
			</div>
		);
	}

	return (
		<div className="">
			<Card className="dark:bg-main-black">
				<CardHeader>
					<CardTitle className="text-3xl flex items-center gap-2">
						<Building2 className="h-6 w-6 text-light-green" /> Update Supplier
					</CardTitle>
					<CardDescription>
						Update supplier information by modifying the form below
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...UpdateSupplierForm}>
						<form
							className="grid gap-6"
							onSubmit={UpdateSupplierForm.handleSubmit(onUpdateSupplier)}
						>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<FormField
									control={UpdateSupplierForm.control}
									name="registration_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Supplier - Company{" "}
												<span className="text-red-500">*</span>
											</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Supplier - Company" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={UpdateSupplierForm.control}
									name="party_identification_scheme"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Supplier Identification</FormLabel>
											<Select
												defaultValue={field.value ?? undefined}
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
									control={UpdateSupplierForm.control}
									name="party_identification_value"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Identification Value</FormLabel>
											<FormControl>
												<Input
													{...field}
													disabled={
														!UpdateSupplierForm.watch(
															"party_identification_scheme"
														)
													}
													placeholder="Identification Value"
													value={field.value ?? ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={UpdateSupplierForm.control}
									name="vat_number"
									render={({ field }) => (
										<FormItem>
											<FormLabel>VAT Number</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="VAT Number"
													value={field.value ?? ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={UpdateSupplierForm.control}
									name="bank_account"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Bank Account</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Bank Account"
													value={field.value ?? ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={UpdateSupplierForm.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Phone"
													value={field.value ?? ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={UpdateSupplierForm.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Email"
													value={field.value ?? ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={UpdateSupplierForm.control}
									name="whatsapp"
									render={({ field }) => (
										<FormItem>
											<FormLabel>WhatsApp</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="WhatsApp"
													value={field.value ?? ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={UpdateSupplierForm.control}
									name="city"
									render={({ field }) => (
										<FormItem>
											<FormLabel>City</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="City"
													value={field.value ?? ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={UpdateSupplierForm.control}
									name="division"
									render={({ field }) => (
										<FormItem>
											<FormLabel>District</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="District"
													value={field.value ?? ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={UpdateSupplierForm.control}
									name="street"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Street</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Street"
													value={field.value ?? ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={UpdateSupplierForm.control}
									name="building_number"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Building Number</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Building Number"
													value={field.value ?? ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={UpdateSupplierForm.control}
									name="postal_code"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Postal Code</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Postal Code"
													value={field.value ?? ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={UpdateSupplierForm.control}
									name="website"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Website</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Website"
													value={field.value ?? ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={UpdateSupplierForm.control}
									name="notes"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Note</FormLabel>
											<FormControl>
												<Textarea
													{...field}
													placeholder="Note"
													value={field.value ?? ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex justify-end gap-4">
								<Button
									type="button"
									variant="outline"
									onClick={() => router.back()}
									disabled={isUpdatingSupplier}
								>
									Cancel
								</Button>
								<MainButton
									disabled={!isValid || isUpdatingSupplier}
									isLoading={isUpdatingSupplier}
									loadingText="Updating Supplier..."
								>
									Update Supplier
								</MainButton>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};
