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
	const { CreateClientForm, isCreatingClient, onCreateClient } =
		useCreateClient();
	const isValid = CreateClientForm.formState.isValid;

	return (
		<CustomDialog
			dialogContentClassName="sm:min-w-[80rem] dark:bg-main-black"
			title="clients"
			trigger="Add Client"
		>
			<Form {...CreateClientForm}>
				<form
					className="grid gap-4"
					onSubmit={CreateClientForm.handleSubmit(onCreateClient)}
				>
					<div className="grid grid-cols-4 gap-10">
						<FormField
							control={CreateClientForm.control}
							name="RegistrationName"
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
							name="email"
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
							name="PartyIdentification.schemeID"
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
							name="PartyIdentification.value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Identification Value</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={
												!CreateClientForm.watch("PartyIdentification.schemeID")
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
							name="CompanyID"
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
							name="Country"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Country</FormLabel>
									<FormControl>
										<Input {...field} placeholder="Country" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={CreateClientForm.control}
							name="CityName"
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
							name="CitySubdivisionName"
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
							name="StreetName"
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
							name="BuildingNumber"
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
							name="PostalZone"
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
