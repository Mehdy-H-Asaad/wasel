import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { PROJECTS_QUERY_KEY } from "../constants/project.constants";
import { TProjectDTO } from "../schema/project.schema";

type TUseGetProjectsOptions = {
  limit?: number;
  page?: number;
  filters?: {
    name?: string;
    status?: string;
    customer_id?: string;
  };
};

export const useGetProjects = (options?: TUseGetProjectsOptions) => {
  const { data, isFetching, metaData } = useApiQuery<TProjectDTO[]>({
    queryKey: [PROJECTS_QUERY_KEY, options],
    requestURL: `/projects`,
    axiosConfig: {
      params: {
        limit: options?.limit || 10,
        page: options?.page || 1,
        ...options?.filters,
      },
    },
    isZustandPagination: false,
  });

  return { projects: data, isLoadingProjects: isFetching, metaData };
};
