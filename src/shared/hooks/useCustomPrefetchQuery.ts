import { QueryClient, QueryKey, QueryOptions } from "@tanstack/react-query";
import { axiosClient } from "../api/axios";
import { AxiosRequestConfig, AxiosError } from "axios";

type TUsePrefetchQueryProps<T> = {
	queryKey: QueryKey;
	requestURL: string;
	axiosConfig?: AxiosRequestConfig;
	queryClient: QueryClient;
} & QueryOptions<T>;

type TServerResponse<T> = {
	data: T;
};

export const useCustomPrefetchQuery = <T>({
	axiosConfig,
	queryKey,
	requestURL,
	queryClient,
	...prefetchQueryOptions
}: TUsePrefetchQueryProps<TServerResponse<T>>) => {
	return queryClient.prefetchQuery({
		queryKey: queryKey,
		queryFn: async () => {
			try {
				const { data }: { data: TServerResponse<T> } = await axiosClient.get(
					requestURL,
					axiosConfig
				);

				return data;
			} catch (error: unknown) {
				const axiosError = error as AxiosError<{
					message?: string;
					detail?: string;
				}>;
				const responseData = axiosError?.response?.data;
				const normalizedError = {
					message:
						responseData?.message ||
						responseData?.detail ||
						"Something Went Wrong",
					status: axiosError?.response?.status || 500,
				};
				throw normalizedError;
			}
		},
		...prefetchQueryOptions,
	});
};
