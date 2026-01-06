import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { BRANCHES_QUERY_KEY } from "../constants/branch.constants";
import { TBranchDTO } from "../schema/branch.schema";

type TUseGetBranchesOptions = {
  limit?: number;
  page?: number;
  filters?: {
    name?: string;
  };
};

export const useGetBranches = (options?: TUseGetBranchesOptions) => {
  const { data, isFetching, metaData } = useApiQuery<TBranchDTO[]>({
    queryKey: [BRANCHES_QUERY_KEY, options],
    requestURL: `branches`,
    axiosConfig: {
      params: {
        limit: options?.limit || 10,
        page: options?.page || 1,
        name: options?.filters?.name,
      },
    },
    isZustandPagination: false,
  });

  return { branches: data, isLoadingBranches: isFetching, metaData };
};
