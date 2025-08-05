import { ChangeEvent } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type THandleNumberFieldChecker<T extends FieldValues> = {
	field: ControllerRenderProps<T>;
	event: ChangeEvent<HTMLInputElement>;
	type: "number" | "string";
};

export const handleNumberInput = <T extends FieldValues>({
	field,
	event,
	type,
}: THandleNumberFieldChecker<T>) => {
	const { value } = event.target;

	if (value === "") {
		field.onChange(null);
	} else if (/^\d+$/.test(value)) {
		if (type === "number") field.onChange(Number(value));
		else field.onChange(value);
	}
};
