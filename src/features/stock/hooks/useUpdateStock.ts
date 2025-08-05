"use client";
import { z } from "zod";
import { stockSchema } from "../schema/stock.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { STOCKS } from "../constants/stock.constants";
import { UPDATE_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { TStockDTO } from "../types/stock.types";

export const useUpdateStock = (stock: TStockDTO) => {
	const { mutate, isPending } = useApiMutation<TStockDTO[], TUpdateStockDTO>({
		axiosRequestMethod: "put",
		queryKey: [STOCKS],
		requestURL: `/${STOCKS}/${stock.id}`,
		successMsg: `Item ${UPDATE_SUCCESS_MESSAGE}`,
	});

	const updateStockSchema = stockSchema;

	type TUpdateStockDTO = z.infer<typeof updateStockSchema>;

	const UpdateStockForm = useForm<TUpdateStockDTO>({
		resolver: zodResolver(updateStockSchema),
		defaultValues: {
			name: stock.name,
			price: stock.price,
		},
	});

	const onUpdateStock = (values: TUpdateStockDTO) => {
		mutate(values);
	};

	return { UpdateStockForm, onUpdateStock, isUpdatingStock: isPending };
};
