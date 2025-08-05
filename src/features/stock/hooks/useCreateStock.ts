"use client";
import { z } from "zod";
import { stockSchema } from "../schema/stock.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { STOCKS } from "../constants/stock.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { TStockDTO } from "../types/stock.types";

export const useCreateStock = () => {
	const { mutate, isPending } = useApiMutation<TStockDTO[], TCreateStockDTO>({
		axiosRequestMethod: "post",
		queryKey: [STOCKS],
		requestURL: `/${STOCKS}`,
		successMsg: `Item ${CREATION_SUCCESS_MESSAGE}`,
		onSuccess: () => CreateStockForm.reset(),
	});

	const createStockSchema = stockSchema;

	type TCreateStockDTO = z.infer<typeof createStockSchema>;

	const CreateStockForm = useForm<TCreateStockDTO>({
		resolver: zodResolver(createStockSchema),
		defaultValues: {
			name: "",
			price: undefined,
		},
	});

	const onCreateStock = (values: TCreateStockDTO) => {
		mutate(values);
	};

	return { CreateStockForm, onCreateStock, isCreatingStock: isPending };
};
