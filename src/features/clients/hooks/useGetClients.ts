import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { CLIENTS } from "../constants/client.constant";
import { TClientDTO } from "../schema/client.schema";

export type TClientFilters = {
  registration_name?: string;
  vat_number?: string;
  phone?: string;
  limit?: number;
  page?: number;
};

type TUseGetClientsOptions = {
  filters?: TClientFilters;
};

export const useGetClients = ({ filters }: TUseGetClientsOptions) => {
  const { data, isFetching, metaData } = useApiQuery<TClientDTO[]>({
    queryKey: [CLIENTS, filters],
    requestURL: `/${CLIENTS}`,
    axiosType: "private",
    axiosConfig: {
      params: {
        ...filters,
      },
    },
    isZustandPagination: false,
  });

  return { clients: data, isLoadingClients: isFetching, metaData };
};
