import { toast } from "sonner";
import {
	MutationKey,
	QueryKey,
	useMutation,
	UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosError } from "axios";
import { getQueryClient } from "@/shared/providers/get-query-client";
import { axiosPublicClient, axiosPrivateClient } from "../lib/axios";
import { TServerResponse } from "../types/types";

type THTTPRequestMethod = "put" | "post" | "delete" | "patch";

type TApiError = {
	success: false;
	error: {
		message: string;
		statusCode: number;
		timestamp: string;
		path: string;
		method: string;
	};
};

// This is what you'll get in `onError`
type TNormalizedError = {
	message: string;
};

type TUseApiMutation<TData, TVariables, TContext = unknown> = {
	mutationKey?: MutationKey;
	queryKey: QueryKey;
	axiosRequestMethod: THTTPRequestMethod;
	requestURL: string;
	axiosRequestConfig?: AxiosRequestConfig;
	successMsg: string;
	axiosType?: "public" | "private";
} & Omit<
	UseMutationOptions<
		TServerResponse<TData>,
		TNormalizedError,
		TVariables,
		TContext
	>,
	"mutationFn" | "mutationKey"
>;

const queryClient = getQueryClient();

export const useApiMutation = <TData, TVariables, TContext = unknown>({
	mutationKey,
	axiosRequestMethod,
	requestURL,
	axiosRequestConfig,
	successMsg,
	queryKey,
	axiosType = "private",
	...mutationOptions
}: TUseApiMutation<TData, TVariables, TContext>) => {
	const mutation = useMutation<
		TServerResponse<TData>,
		TNormalizedError,
		TVariables,
		TContext
	>({
		mutationKey,
		mutationFn: async (values: TVariables) => {
			try {
				const axiosClient =
					axiosType === "public" ? axiosPublicClient : axiosPrivateClient;

				const { data }: { data: TServerResponse<TData> } = await axiosClient[
					axiosRequestMethod
				](
					requestURL,
					axiosRequestMethod === "delete"
						? { ...axiosRequestConfig, data: values }
						: values,
					axiosRequestConfig
				);

				return data;
			} catch (error: unknown) {
				const axiosError = error as AxiosError<TApiError>;
				const responseData = axiosError?.response?.data;

				throw {
					message: responseData?.error?.message || "Something went wrong.",
				} as TNormalizedError;
			}
		},
		...mutationOptions,
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey, exact: false });
			toast.success(successMsg);
			mutationOptions?.onSuccess?.(data, variables, context);
		},
		onError: (error, variables, context) => {
			// Now `error.message` works because we normalized it
			toast.error(error.message);
			mutationOptions?.onError?.(error, variables, context);
		},
	});

	return { ...mutation, queryClient };
};
