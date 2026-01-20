import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { PROJECTS_QUERY_KEY } from "../constants/project.constants";
import { TProjectDTO } from "../schema/project.schema";

export const useGetSingleProject = (id: number) => {
  const { data, isFetching } = useApiQuery<TProjectDTO>({
    queryKey: [PROJECTS_QUERY_KEY, id],
    requestURL: `/projects/${id}`,
    enabled: !!id,
  });

  return { project: data, isLoadingProject: isFetching };
};
