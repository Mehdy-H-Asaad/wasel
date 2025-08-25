import { useFormContext, useWatch } from "react-hook-form";
import { TCreateCompanyInfoDTO } from "../../schema/company-info.schema";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { INVOICING_TYPES } from "../../data/auth.data";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CLIENT_IDENTIFCATIONS } from "@/features/clients/constants/client.constant";
import { MainButton } from "@/components/common/MainButton";
import { useAuthNextStepStore } from "../../store/auth-next-step.store";

export const CompanyGeneralInfo = () => {
	const form = useFormContext<TCreateCompanyInfoDTO>();
	const { setStep } = useAuthNextStepStore();

	const {
		registration_name,
		phone,
		vat_number,
		invoicing_type,
		business_category,
		party_identification_scheme,
		party_identification_value,
	} = useWatch({ control: form.control });

	const isValid =
		registration_name &&
		phone &&
		vat_number &&
		invoicing_type &&
		business_category &&
		party_identification_scheme &&
		party_identification_value;

	const handleNext = () => {
		form.trigger([
			"registration_name",
			"phone",
			"vat_number",
			"invoicing_type",
			"business_category",
			"party_identification_scheme",
			"party_identification_value",
		]);
		if (isValid) {
			setStep(4);
		}
	};

	return (
		<div className="dark:bg-main-black p-8 rounded-lg">
			<h1 className="text-2xl font-bold">Company General Info </h1>
			<p className="text-sm text-gray-500">
				Enter your company general information below to create your account
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20 mt-6">
				<FormField
					control={form.control}
					name="registration_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Company Name" />
							</FormControl>
							<FormDescription>
								Your company name is used to identify your company in the system
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Phone" />
							</FormControl>
							<FormDescription>
								Enter your company phone number. Must be a valid phone number.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="vat_number"
					render={({ field }) => (
						<FormItem>
							<FormLabel>VAT Number</FormLabel>
							<FormControl>
								<Input {...field} placeholder="VAT Number" />
							</FormControl>
							<FormDescription>
								Your VAT Number is at least 15 digits long and must be unique
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="invoicing_type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Invoicing Type</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select Invoicing Type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{INVOICING_TYPES.map(type => (
										<SelectItem key={type.value} value={type.value}>
											{type.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								Select the invoicing type for your company.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="business_category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Business Category</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Business Category" />
							</FormControl>
							<FormDescription>
								Enter your company business category.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="party_identification_scheme"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Company Identification</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select Company Identification" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{CLIENT_IDENTIFCATIONS.map(type => (
										<SelectItem key={type.value} value={type.value}>
											{type.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormDescription>
								Select the company identification scheme.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="party_identification_value"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Identification Value</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Identification Value" />
							</FormControl>
							<FormDescription>
								Enter your company identification value.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<div className="flex justify-end mt-6">
				<MainButton onClick={handleNext} className="w-fit" disabled={!isValid}>
					Next
				</MainButton>
			</div>
		</div>
	);
};
