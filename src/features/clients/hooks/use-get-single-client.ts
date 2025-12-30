import { TClientDTO } from "../schema/client.schema";
import { CLIENTS } from "../constants/client.constant";
import { useApiQuery } from "@/shared/hooks/useApiQuery";

export const useGetSingleClient = ({ id }: { id: number }) => {
  const { data, isFetching, metaData } = useApiQuery<TClientDTO>({
    queryKey: [CLIENTS, id],
    requestURL: `/${CLIENTS}/${id}`,
    axiosType: "private",
    enabled: !!id,
  });

  return { client: data, isLoadingClient: isFetching, metaData };
};
