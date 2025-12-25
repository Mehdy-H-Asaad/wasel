import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { CLIENTS } from "../constants/client.constant";
import { TClientDTO } from "../schema/client.schema";

type TUseGetClientsOptions = {
	limit?: number;
	page?: number;
	filters?: {
		registration_name?: string;
	};
};

export const useGetClients = (options?: TUseGetClientsOptions) => {
	const { data, isFetching, metaData } = useApiQuery<TClientDTO[]>({
		queryKey: [CLIENTS, options],
		requestURL: `/${CLIENTS}`,
		axiosType: "private",
		axiosConfig: {
			params: {
				limit: options?.limit || 10,
				page: options?.page || 1,
				registration_name: options?.filters?.registration_name,
			},
		},
		isZustandPagination: false,
	});

	return { clients: data, isLoadingClients: isFetching, metaData };
};
