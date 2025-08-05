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

export const UpdateStock = (stock: TStockDTO) => {
	const { UpdateStockForm, onUpdateStock, isUpdatingStock } =
		useUpdateStock(stock);
	const isValid = UpdateStockForm.formState.isValid;

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
										onChange={event =>
											handleNumberInput({ field, event, type: "number" })
										}
										value={field.value ?? ""}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<DialogFooter>
						<MainButton disabled={!isValid || isUpdatingStock}>
							{isUpdatingStock ? "Updating..." : "Update Stock"}
						</MainButton>
					</DialogFooter>
				</form>
			</Form>
		</CustomDialog>
	);
};
