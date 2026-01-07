import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { CLIENTS } from "../constants/client.constant";
import { TClientDTO } from "../schema/client.schema";

type TUseGetClientsOptions = {
	filters?: {
		limit?: number;
		page?: number;
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
				// limit: options?.limit || 10,
				// page: options?.page || 1,
				registration_name: options?.filters?.registration_name,
				...options?.filters,
			},
		},
		isZustandPagination: false,
	});

	return { clients: data, isLoadingClients: isFetching, metaData };
};
