import { ChangeEvent } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type THandleNumberFieldChecker<T extends FieldValues> = {
	field: ControllerRenderProps<T>;
	event: ChangeEvent<HTMLInputElement>;
};

export const handleNumberInput = <T extends FieldValues>({
	field,
	event,
}: THandleNumberFieldChecker<T>) => {
	const { value } = event.target;

	if (value === "") {
		field.onChange(null);
	} else if (/^\d+$/.test(value)) {
		field.onChange(Number(value));
	}
};
