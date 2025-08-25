"use client";
import { useFormContext } from "react-hook-form";
import { TCreateCompanyInfoDTO } from "../../schema/company-info.schema";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";

import { MainButton } from "@/components/common/MainButton";
import { useAuthNextStepStore } from "../../store/auth-next-step.store";

export const CompanyLocationInfo = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const form = useFormContext<TCreateCompanyInfoDTO>();
	const { setStep } = useAuthNextStepStore();

	const handlePrevious = () => {
		setStep(3);
	};

	return (
		<div className="dark:bg-main-black p-8 rounded-lg">
			<h1 className="text-2xl font-bold">Company Location Info </h1>
			<p className="text-sm text-gray-500">
				Enter your company location information below to create your account
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-6">
				<FormField
					control={form.control}
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
					control={form.control}
					name="division"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Division</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Division" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
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
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Address" />
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
								<Input {...field} placeholder="Building Number" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
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

			<div className="flex justify-between mt-6">
				<MainButton onClick={handlePrevious} className="w-fit">
					Previous
				</MainButton>
				{children}
			</div>
		</div>
	);
};
