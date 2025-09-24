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
import { useCreateClient } from "../hooks/useCreateClient";
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectLabel,
	SelectGroup,
} from "@/components/ui/select";
import { CLIENT_IDENTIFCATIONS } from "../constants/client.constant";

export const CreateClient = () => {
	const { CreateClientForm, isCreatingClient, onCreateClient, open, setOpen } =
		useCreateClient();
	const isValid = CreateClientForm.formState.isValid;

	return (
		<CustomDialog
			dialogContentClassName="sm:min-w-[40rem] dark:bg-main-black"
			title="clients"
			trigger="Add Client"
			open={open}
			setOpen={setOpen}
			isMainButton
		>
			<Form {...CreateClientForm}>
				<form
					className="grid gap-4"
					onSubmit={CreateClientForm.handleSubmit(onCreateClient)}
				>
					<div className="grid grid-cols-2 gap-6">
						<FormField
							control={CreateClientForm.control}
							name="registration_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Client - Company</FormLabel>
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
									<FormLabel>Client Identification</FormLabel>
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
									<FormLabel>Identification Value</FormLabel>
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
									<FormLabel>VAT Number</FormLabel>
									<FormControl>
										<Input {...field} placeholder="VAT Number" />
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
									<FormLabel>City</FormLabel>
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
									<FormLabel>District</FormLabel>
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
									<FormLabel>Street</FormLabel>
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
									<FormLabel>Building Number</FormLabel>
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
									<FormLabel>Postal Code</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Postal Code" />
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
		</CustomDialog>
	);
};
