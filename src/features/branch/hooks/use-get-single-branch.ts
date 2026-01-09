import { TBranchDTO } from "../schema/branch.schema";
import { BRANCHES_QUERY_KEY } from "../constants/branch.constants";
import { useApiQuery } from "@/shared/hooks/useApiQuery";

export const useGetSingleBranch = ({ id }: { id: string }) => {
  const { data, isFetching, metaData } = useApiQuery<TBranchDTO>({
    queryKey: [BRANCHES_QUERY_KEY, id],
    requestURL: `/branches/${id}`,
    axiosType: "private",
    enabled: !!id,
  });

  return { branch: data, isLoadingBranch: isFetching, metaData };
};
