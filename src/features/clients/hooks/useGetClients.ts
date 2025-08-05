import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { CLIENTS } from "../constants/client.constant";
import { TClientDTO } from "../types/client.types";

export const useGetClients = () => {
	const { data, isFetching, metaData } = useApiQuery<TClientDTO[]>({
		queryKey: [CLIENTS],
		requestURL: `/${CLIENTS}`,
	});

	return { clients: data, isLoadingClients: isFetching, metaData };
};
