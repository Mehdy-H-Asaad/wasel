"use client";
import { CreateStockSchema, TCreateStockDTO } from "../schema/stock.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { STOCKS } from "../constants/stock.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { TStockDTO } from "../schema/stock.schema";
import { useState } from "react";

export const useCreateStock = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { mutate, isPending } = useApiMutation<TStockDTO, TCreateStockDTO>({
		axiosRequestMethod: "post",
		queryKey: [STOCKS],
		requestURL: `/${STOCKS}`,
		successMsg: `Item ${CREATION_SUCCESS_MESSAGE}`,
		onSuccess: () => {
			setOpen(false);
			CreateStockForm.reset();
		},
	});

	const CreateStockForm = useForm<TCreateStockDTO>({
		resolver: zodResolver(CreateStockSchema),
		defaultValues: {
			name: "",
			default_sale_price: undefined,
			default_buy_price: undefined,
			unit_code: "",
			description: "",
		},
	});

	const onCreateStock = (values: TCreateStockDTO) => {
		mutate(values);
	};

	return {
		CreateStockForm,
		onCreateStock,
		isCreatingStock: isPending,
		open,
		setOpen,
	};
};
