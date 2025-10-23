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
import { useCreateStock } from "../hooks/useCreateStock";
import { CustomDialog } from "@/components/common/CustomDialog";
import { handleNumberInput } from "@/shared/utils/handle-number-input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { STOCK_UNITS } from "../constants/stock.constants";
import { Textarea } from "@/components/ui/textarea";

export const CreateStock = () => {
	const { CreateStockForm, onCreateStock, isCreatingStock, open, setOpen } =
		useCreateStock();
	const isValid = CreateStockForm.formState.isValid;

	return (
		<CustomDialog
			title="stocks"
			trigger="create stock"
			open={open}
			setOpen={setOpen}
			isMainButton
		>
			<Form {...CreateStockForm}>
				<form
					className="grid gap-4"
					onSubmit={CreateStockForm.handleSubmit(onCreateStock)}
				>
					<FormField
						control={CreateStockForm.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Stock Name</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Stock Name" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={CreateStockForm.control}
						name="default_buy_price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Buy Price</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Buy Price"
										onChange={event => handleNumberInput({ field, event })}
										value={field.value ?? ""}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={CreateStockForm.control}
						name="default_sale_price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sale Price</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Sale Price"
										onChange={event => handleNumberInput({ field, event })}
										value={field.value ?? ""}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={CreateStockForm.control}
						name="unit_code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Unit</FormLabel>
								<Select onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select Unit" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{STOCK_UNITS.map(unit => (
											<SelectItem key={unit.value} value={unit.value}>
												{unit.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={CreateStockForm.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea {...field} placeholder="Description" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<DialogFooter>
						<MainButton disabled={!isValid || isCreatingStock}>
							{isCreatingStock ? "Creating..." : "Create Stock"}
						</MainButton>
					</DialogFooter>
				</form>
			</Form>
		</CustomDialog>
	);
};
