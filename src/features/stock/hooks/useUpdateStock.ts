"use client";
import { UpdateStockSchema } from "../schema/stock.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { STOCKS } from "../constants/stock.constants";
import { UPDATE_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { TStockDTO, TUpdateStockDTO } from "../schema/stock.schema";

export const useUpdateStock = (stock: TStockDTO) => {
	const { mutate, isPending } = useApiMutation<TStockDTO, TUpdateStockDTO>({
		axiosRequestMethod: "patch",
		queryKey: [STOCKS],
		requestURL: `/${STOCKS}/${stock.id}`,
		successMsg: `Item ${UPDATE_SUCCESS_MESSAGE}`,
	});

	const UpdateStockForm = useForm<TUpdateStockDTO>({
		resolver: zodResolver(UpdateStockSchema),
		defaultValues: {
			name: stock.name,
			default_sale_price: Number(stock.default_sale_price),
			default_buy_price: Number(stock.default_buy_price),
			unit_code: stock.unit_code,
			description: stock.description ?? "",
		},
	});

	const onUpdateStock = (values: TUpdateStockDTO) => {
		mutate(values);
	};

	return { UpdateStockForm, onUpdateStock, isUpdatingStock: isPending };
};
