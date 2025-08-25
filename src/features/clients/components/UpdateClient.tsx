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
import { useUpdateClient } from "../hooks/useUpdateClient";
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectLabel,
	SelectGroup,
} from "@/components/ui/select";
import { TClientDTO } from "../types/client.types";

export const UpdateClient = (client: TClientDTO) => {
	const { UpdateClientForm, isUpdatingClient, onUpdateClient } =
		useUpdateClient(client);
	const isValid = UpdateClientForm.formState.isValid;

	const parties = [
		{
			label: "Commercial Registration number",
			value: "CRN",
		},
		{
			label: "MOMRAH license",
			value: "MOM",
		},
		{
			label: "MHRSD license",
			value: "MLS",
		},
		{
			label: "700",
			value: "700",
		},
		{
			label: "MISA license",
			value: "SAG",
		},
		{
			label: "Other OD",
			value: "OTH",
		},
	];

	return (
		<CustomDialog
			dialogContentClassName="sm:min-w-[80rem] dark:bg-main-black"
			title="clients"
			trigger="Update Client"
		>
			<Form {...UpdateClientForm}>
				<form
					className="grid gap-4"
					onSubmit={UpdateClientForm.handleSubmit(onUpdateClient)}
				>
					<div className="grid grid-cols-4 gap-10">
						<FormField
							control={UpdateClientForm.control}
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
							control={UpdateClientForm.control}
							name="party_identification_value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Email" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={UpdateClientForm.control}
							name="party_identification_scheme"
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
							control={UpdateClientForm.control}
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
												{parties.map(client => (
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
							control={UpdateClientForm.control}
							name="party_identification_value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Identification Value</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={
												!UpdateClientForm.watch("party_identification_scheme")
											}
											placeholder="Identification Value"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={UpdateClientForm.control}
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
							control={UpdateClientForm.control}
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
							control={UpdateClientForm.control}
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
							control={UpdateClientForm.control}
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
							control={UpdateClientForm.control}
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
							control={UpdateClientForm.control}
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
						<MainButton disabled={!isValid || isUpdatingClient}>
							{isUpdatingClient ? "Updating..." : "Update Client"}
						</MainButton>
					</DialogFooter>
				</form>
			</Form>
		</CustomDialog>
	);
};
