import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { CLIENTS } from "../constants/client.constant";
import { TClientDTO } from "../schema/client.schema";

export const useGetClients = () => {
  const { data, isFetching, metaData } = useApiQuery<TClientDTO[]>({
    queryKey: [CLIENTS],
    requestURL: `/${CLIENTS}`,
    axiosType: "private",
    axiosConfig: {
      params: {
        limit: 10,
        page: 1,
      },
    },
    isZustandPagination: false,
  });

  return { clients: data, isLoadingClients: isFetching, metaData };
};
