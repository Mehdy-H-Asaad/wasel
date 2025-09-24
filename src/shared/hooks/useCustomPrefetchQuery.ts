import { QueryClient, QueryKey, QueryOptions } from "@tanstack/react-query";
import { axiosPublicClient, axiosPrivateClient } from "../lib/axios";
import { AxiosRequestConfig, AxiosError } from "axios";

type TUsePrefetchQueryProps<T> = {
	queryKey: QueryKey;
	requestURL: string;
	axiosConfig?: AxiosRequestConfig;
	queryClient: QueryClient;
	axiosType: "public" | "private";
} & QueryOptions<T>;

type TServerResponse<T> = {
	data: T;
};

export const useCustomPrefetchQuery = <T>({
	axiosConfig,
	queryKey,
	requestURL,
	queryClient,
	axiosType = "private",
	...prefetchQueryOptions
}: TUsePrefetchQueryProps<TServerResponse<T>>) => {
	return queryClient.prefetchQuery({
		queryKey: queryKey,
		queryFn: async () => {
			try {
				const client =
					axiosType === "public" ? axiosPublicClient : axiosPrivateClient;

				const { data }: { data: TServerResponse<T> } = await client.get(
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
