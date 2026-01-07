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
import { ChevronsUpDown, Check, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/shared/hooks/use-debounce";

type TAsyncSelectOption<TValue> = {
  value: TValue;
  label: string;
};

type AsyncSelectProps<TValue extends string | number> = {
  options: TAsyncSelectOption<TValue>[];
  placeholder?: string;
  isLoading: boolean;
  value?: TValue | null;
  searchValue?: string | null;
  onSearch?: (searchValue: string) => void;
  onChange?: (value: TValue | null) => void;
};

export const AsyncSelect = <TValue extends string | number>({
  options,
  placeholder = "Select option...",
  value,
  isLoading,
  onChange,
  onSearch,
}: AsyncSelectProps<TValue>) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<TValue | null>(
    value ?? null
  );
  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedSearch = useDebounce({
    callback: (searchValue: string) => {
      onSearch?.(searchValue);
    },
    delay: 300,
  });

  const handleSearch = (value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    setSelectedValue(value ?? null);
  }, [value]);

  const handleSelect = (currentValue: string) => {
    const selected = options.find(
      (option) => String(option.value) === currentValue
    );
    const newValue = selected?.value ?? null;
    setSelectedValue(newValue);
    onChange?.(newValue);
    setSearchValue("");
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
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            className="h-9"
            value={searchValue}
            onValueChange={handleSearch}
          />
          <CommandList>
            {options.length === 0 && (
              <CommandEmpty>
                {isLoading ? (
                  <Loader2 className="animate-spin w-4 h-4 text-center mx-auto" />
                ) : (
                  "No option found."
                )}
              </CommandEmpty>
            )}
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
