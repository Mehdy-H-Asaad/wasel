"use client";

import { useFormContext } from "react-hook-form";
import { TCreateOrganizationDTO } from "../../schema/organization.schema";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const OrganizationAddressStep = () => {
	const form = useFormContext<TCreateOrganizationDTO>();

	return (
		<div className="space-y-6 animate-in fade-in-50 duration-300">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<FormField
					control={form.control}
					name="street"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Street</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Street name" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="building_number"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Building Number</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Building number" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<FormField
					control={form.control}
					name="city"
					render={({ field }) => (
						<FormItem>
							<FormLabel>City</FormLabel>
							<FormControl>
								<Input {...field} placeholder="City name" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="division"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Division / Region</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Division or region" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<FormField
				control={form.control}
				name="postal_code"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Postal Code</FormLabel>
						<FormControl>
							<Input {...field} placeholder="Postal code" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="address"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Full Address</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Enter complete address"
								rows={3}
								className="resize-none"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
};
