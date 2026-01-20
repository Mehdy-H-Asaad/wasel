import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { PROJECTS_QUERY_KEY } from "../constants/project.constants";
import { DELETE_SUCCESS_MESSAGE } from "@/shared/data/constants";

export const useDeleteProject = (id: number) => {
  const { mutate, isPending } = useApiMutation<void, void>({
    axiosRequestMethod: "delete",
    queryKey: [PROJECTS_QUERY_KEY],
    requestURL: `/projects/${id}`,
    successMsg: `Project ${DELETE_SUCCESS_MESSAGE}`,
  });

  const onDeleteProject = () => {
    mutate();
  };

  return {
    deleteProject: onDeleteProject,
    isDeletingProject: isPending,
  };
};
