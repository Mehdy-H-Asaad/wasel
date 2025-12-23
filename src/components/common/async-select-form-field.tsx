import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import { Button } from "../ui/button";

type TAsyncSelectOption<T> = {
  value: T;
  label: string;
};

type AsyncSelectProps<T> = {
  options: TAsyncSelectOption<T>[];
  placeholder?: string;
  value?: T;
  onChange?: (value: T | null) => void;
};

export const AsyncSelect = <T extends string | number>({
  options,
  placeholder = "Select option...",
  value,
  onChange,
}: AsyncSelectProps<T>) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<T | null>(
    value ?? null
  );

  const handleSelect = (currentValue: string) => {
    const selected = options.find(
      (option) => String(option.value) === currentValue
    );
    const newValue = selected ? selected.value : null;
    setSelectedValue(newValue);
    onChange?.(newValue);
    setOpen(false);
  };

  const displayValue =
    options.find((option) => option.value === selectedValue)?.label ||
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
              {options.map((option) => (
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
