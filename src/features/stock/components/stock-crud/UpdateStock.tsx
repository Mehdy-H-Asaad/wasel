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
import { handleNumberInput } from "@/shared/utils/handle-number-input";
import { useUpdateStock } from "../../hooks/useUpdateStock";
import { TStockDTO } from "../../types/stock.types";
import {
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	Select,
} from "@/components/ui/select";
import { STOCK_UNITS } from "../../constants/stock.constants";

export const UpdateStock = (stock: TStockDTO) => {
	const { UpdateStockForm, onUpdateStock, isUpdatingStock } =
		useUpdateStock(stock);
	const isValid = UpdateStockForm.formState.isValid;

	console.log(UpdateStockForm.formState.errors);

	return (
		<CustomDialog className="w-full" title="stocks" trigger="update stock">
			<Form {...UpdateStockForm}>
				<form
					className="grid gap-4"
					onSubmit={UpdateStockForm.handleSubmit(onUpdateStock)}
				>
					<FormField
						control={UpdateStockForm.control}
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
						control={UpdateStockForm.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Price"
										onChange={event => handleNumberInput({ field, event })}
										value={field.value ?? ""}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={UpdateStockForm.control}
						name="unit_code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Unit</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
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
					<DialogFooter>
						<MainButton
							disabled={
								!isValid ||
								isUpdatingStock ||
								!UpdateStockForm.formState.isDirty
							}
						>
							{isUpdatingStock ? "Updating..." : "Update Stock"}
						</MainButton>
					</DialogFooter>
				</form>
			</Form>
		</CustomDialog>
	);
};
