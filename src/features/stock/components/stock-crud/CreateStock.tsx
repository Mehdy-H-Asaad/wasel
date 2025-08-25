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
import { useCreateStock } from "../../hooks/useCreateStock";
import { CustomDialog } from "@/components/common/CustomDialog";
import { handleNumberInput } from "@/shared/utils/handle-number-input";

export const CreateStock = () => {
	const { CreateStockForm, onCreateStock, isCreatingStock } = useCreateStock();
	const isValid = CreateStockForm.formState.isValid;

	return (
		<CustomDialog title="stocks" trigger="create stock">
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
						control={CreateStockForm.control}
						name="unit_code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Unit</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Unit" />
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
