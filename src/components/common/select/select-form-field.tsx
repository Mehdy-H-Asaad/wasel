import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

type TSelectFormField<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
  TValue
> = {
  options: {
    label: string;
    value: TValue;
  }[];
  placeholder?: string;
  label?: string;
  field: ControllerRenderProps<TFieldValues, TFieldName>;
};

export const SelectFormField = <
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
  TValue
>({
  options,
  field,
  placeholder = "Select option...",
  label,
}: TSelectFormField<TFieldValues, TFieldName, TValue>) => {
  const handleValueChange = (value: string) => {
    const option = options.find((option) => String(option.value) === value);

    if (option) {
      field.onChange(option.value);
    }
  };

  return (
    <Select
      value={field.value != null ? String(field.value) : ""}
      //   value={field.value ? String(field.value) : ""}
      onValueChange={handleValueChange}
    >
      <FormControl>
        <SelectTrigger className="w-full h-11 bg-background">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>

      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem key={String(option.value)} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
