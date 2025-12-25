import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

type TAsyncSelectOption<TValue> = {
	value: TValue;
	label: string;
};

type AsyncSelectProps<TValue extends string | number> = {
	options: TAsyncSelectOption<TValue>[];
	placeholder?: string;
	value?: TValue | null;
	onChange?: (value: TValue | null) => void;
};

export const AsyncSelect = <TValue extends string | number>({
	options,
	placeholder = "Select option...",
	value,
	onChange,
}: AsyncSelectProps<TValue>) => {
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState<TValue | null>(
		value ?? null
	);

	React.useEffect(() => {
		setSelectedValue(value ?? null);
	}, [value]);

	const handleSelect = (currentValue: string) => {
		const selected = options.find(
			option => String(option.value) === currentValue
		);
		const newValue = selected ? selected.value : null;
		setSelectedValue(newValue);
		onChange?.(newValue);
		setOpen(false);
	};

	const displayValue =
		options.find(option => option.value === selectedValue)?.label ||
		placeholder;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{displayValue}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder={placeholder} className="h-9" />
					<CommandList>
						<CommandEmpty>No option found.</CommandEmpty>
						<CommandGroup>
							{options.map(option => (
								<CommandItem
									key={String(option.value)}
									value={String(option.value)}
									onSelect={handleSelect}
								>
									{option.label}
									<Check
										className={cn(
											"ml-auto",
											selectedValue === option.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
