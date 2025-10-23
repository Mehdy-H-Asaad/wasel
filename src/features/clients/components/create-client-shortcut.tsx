import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogHeader,
	DialogTrigger,
	DialogDescription,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";
import { Form } from "@/components/ui/form";
import { useCreateClient } from "../hooks/useCreateClient";
import { FormDescription, FormField } from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectGroup } from "@/components/ui/select";
import { SelectLabel } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { FormMessage } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { MainButton } from "@/components/common/MainButton";
import { CLIENT_IDENTIFCATIONS } from "../constants/client.constant";

export const CreateClientShortcut = () => {
	const { onCreateClient, CreateClientForm, isCreatingClient } =
		useCreateClient();
	const isValid = CreateClientForm.formState.isValid;

	return (
		<Dialog>
			<DialogTrigger className="capitalize w-fit flex items-center gap-1 text-light-green cursor-pointer rounded-lg border-2 border-light-green py-1 px-2 hover:bg-light-green/10 transition-all duration-300">
				<Plus className="h-4 w-4 text-light-green" />
				<span className="text-xs text-light-green">Client</span>
			</DialogTrigger>
			<DialogContent className="sm:min-w-[60rem] dark:bg-main-black">
				<DialogHeader>
					<DialogTitle>Add New Client</DialogTitle>
					<DialogDescription>Add a new client to your system</DialogDescription>
				</DialogHeader>
				<Form {...CreateClientForm}>
					<form
						className="grid gap-4"
						onSubmit={CreateClientForm.handleSubmit(onCreateClient)}
					>
						<div className="grid grid-cols-3 gap-6">
							<FormField
								control={CreateClientForm.control}
								name="registration_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Client - Company <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Client - Company" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={CreateClientForm.control}
								name="party_identification_scheme"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Client Identification{" "}
											<span className="text-red-500">*</span>
										</FormLabel>
										<Select
											defaultValue={field.value}
											onValueChange={field.onChange}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Client Identification" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Client Identifications</SelectLabel>
													{CLIENT_IDENTIFCATIONS.map(client => (
														<SelectItem key={client.value} value={client.value}>
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
								control={CreateClientForm.control}
								name="party_identification_value"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Identification Value{" "}
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={
													!CreateClientForm.watch("party_identification_scheme")
												}
												placeholder="Identification Value"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={CreateClientForm.control}
								name="vat_number"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											VAT Number <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input {...field} placeholder="VAT Number" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={CreateClientForm.control}
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
								control={CreateClientForm.control}
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
								control={CreateClientForm.control}
								name="city"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											City <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input {...field} placeholder="City" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={CreateClientForm.control}
								name="division"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											District <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input {...field} placeholder="District" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={CreateClientForm.control}
								name="street"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Street <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Street" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={CreateClientForm.control}
								name="building_number"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Building Number <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Building Number" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={CreateClientForm.control}
								name="postal_code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Postal Code <span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Postal Code" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={CreateClientForm.control}
								name="notes"
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
						</div>
						<DialogFooter>
							<MainButton disabled={!isValid || isCreatingClient}>
								{isCreatingClient ? "Creating..." : "Create Client"}
							</MainButton>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
