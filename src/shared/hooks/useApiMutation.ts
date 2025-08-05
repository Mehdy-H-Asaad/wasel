import { toast } from "sonner";
import {
	MutationKey,
	QueryKey,
	useMutation,
	UseMutationOptions,
} from "@tanstack/react-query";
import { axiosClient, axiosPublicClient } from "../api/axios";
import { AxiosRequestConfig, AxiosError } from "axios";
import { getQueryClient } from "../providers/get-query-client";

type THTTPRequestMethod = "put" | "post" | "delete" | "patch";

type TApiError = {
	message: string;
	code: number;
};

type TUseApiMutation<TData, TVariables, TContext> = {
	mutationKey?: MutationKey;
	queryKey: QueryKey;
	axiosRequestMethod: THTTPRequestMethod;
	requestURL: string;
	axiosRequestConfig?: AxiosRequestConfig;
	successMsg: string;
	axiosType?: "public" | "private";
} & Omit<
	UseMutationOptions<TData, TApiError, TVariables, TContext>,
	"mutationFn" | "mutationKey"
>;

const queryClient = getQueryClient();

export const useApiMutation = <TData, TVariables = void, TContext = unknown>({
	mutationKey,
	axiosRequestMethod,
	requestURL,
	axiosRequestConfig,
	successMsg,
	queryKey,
	axiosType = "private",
	...mutationOptions
}: TUseApiMutation<TData, TVariables, TContext>) => {
	const mutation = useMutation({
		mutationKey: mutationKey,
		mutationFn: async (values: TVariables) => {
			try {
				const { data } =
					axiosType === "public"
						? await axiosPublicClient[axiosRequestMethod](
								requestURL,
								values,
								axiosRequestConfig
						  )
						: await axiosClient[axiosRequestMethod](
								requestURL,
								values,
								axiosRequestConfig
						  );

				return data;
			} catch (error: unknown) {
				const axiosError = error as AxiosError<{
					detail: string | Array<{ msg: string }>;
				}>;
				const responseData = axiosError?.response?.data;
				const normalizedError = {
					message: Array.isArray(responseData?.detail)
						? responseData?.detail
								.map((err: { msg: string }) => err.msg)
								.join(", ")
						: responseData?.detail || "Something went wrong.",
				};
				throw normalizedError;
			}
		},
		...mutationOptions,
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey: queryKey, exact: false });
			toast.success(successMsg);
			mutationOptions?.onSuccess?.(data, variables, context);
		},
		onError: (error: TApiError, variables, context) => {
			toast.error(error.message);
			mutationOptions?.onError?.(error, variables, context);
		},
	});

	return { ...mutation, queryClient };
};
