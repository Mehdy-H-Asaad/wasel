import { axiosClient } from "@/shared/api/axios";
import { UseQueryOptions, useQuery, QueryKey } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";

type TUseApiQueryOptions<TResponse> = {
	queryKey: QueryKey;
	requestURL: string;
	axiosConfig?: AxiosRequestConfig;
	enabled?: boolean;
	showErrorToast?: boolean;
	errorMessage?: string;
} & Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">;

type TServerResponse<T> = {
	data: T;
	limit?: number;
	total_rows?: number;
	total_pages?: number;
	current_page?: number;
};

export const useApiQuery = <TResponse>({
	queryKey,
	requestURL,
	axiosConfig,
	enabled = true,
	errorMessage = "Something went wrong",
	...queryOptions
}: TUseApiQueryOptions<TServerResponse<TResponse>>) => {
	const query = useQuery<TServerResponse<TResponse>>({
		queryKey,
		queryFn: async () => {
			try {
				const { data }: { data: TServerResponse<TResponse> } =
					await axiosClient.get(requestURL, axiosConfig);
				return data;
			} catch (error: unknown) {
				if (error instanceof AxiosError && error.response) {
					const normalizedError = {
						message:
							error?.response?.data?.message ||
							error?.response?.data?.detail ||
							errorMessage,
						status: error?.response?.status || 500,
					};
					throw normalizedError;
				}
				throw error;
			}
		},

		enabled,
		...queryOptions,
	});

	return {
		...query,
		data: query.data?.data,
		metaData: {
			limit: query.data?.limit || 10,
			total_rows: query.data?.total_rows || 0,
			total_pages: query.data?.total_pages || 0,
			current_page: query.data?.current_page || 1,
		},
	};
};
