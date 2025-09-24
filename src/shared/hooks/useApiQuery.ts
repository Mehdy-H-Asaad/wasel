import { UseQueryOptions, useQuery, QueryKey } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { usePaginationStore } from "@/shared/store/pagination.store";
import { TServerResponse } from "../types/types";
import { axiosPublicClient, axiosPrivateClient } from "../lib/axios";

type TUseApiQueryOptions<TResponse> = {
	queryKey: QueryKey;
	requestURL: string;
	axiosConfig?: AxiosRequestConfig;
	enabled?: boolean;
	showErrorToast?: boolean;
	errorMessage?: string;
	axiosType?: "public" | "private";
} & Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">;

export const useApiQuery = <TResponse>({
	queryKey,
	requestURL,
	axiosConfig,
	enabled = true,
	errorMessage = "Something went wrong",
	axiosType = "public",
	...queryOptions
}: TUseApiQueryOptions<TServerResponse<TResponse>>) => {
	const { pagination } = usePaginationStore();

	const query = useQuery<TServerResponse<TResponse>>({
		queryKey: [...queryKey, pagination],
		queryFn: async () => {
			try {
				const { data }: { data: TServerResponse<TResponse> } =
					axiosType === "public"
						? await axiosPublicClient.get(requestURL, {
								...axiosConfig,
								params: {
									...axiosConfig?.params,
									limit: pagination.pageSize,
									page: pagination.pageIndex + 1,
								},
						  })
						: await axiosPrivateClient.get(requestURL, {
								...axiosConfig,
								params: {
									...axiosConfig?.params,
									limit: pagination.pageSize,
									page: pagination.pageIndex + 1,
								},
						  });
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
