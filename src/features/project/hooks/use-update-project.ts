import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { PROJECTS_QUERY_KEY } from "../constants/project.constants";
import { UPDATE_SUCCESS_MESSAGE } from "@/shared/data/constants";
import {
  UpdateProjectSchema,
  TUpdateProjectDTO,
  TProjectDTO,
} from "../schema/project.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useUpdateProject = ({ project }: { project?: TProjectDTO }) => {
  const router = useRouter();
  const { mutate, isPending, isSuccess } = useApiMutation<
    TProjectDTO,
    TUpdateProjectDTO
  >({
    axiosRequestMethod: "patch",
    queryKey: [PROJECTS_QUERY_KEY],
    requestURL: project ? `/projects/${project.id}` : "",
    successMsg: `Project ${UPDATE_SUCCESS_MESSAGE}`,
    onSuccess: () => {
      router.push("/admin/projects");
    },
  });

  const UpdateProjectForm = useForm<TUpdateProjectDTO>({
    resolver: zodResolver(UpdateProjectSchema),
    defaultValues: {
      name: "",
      description: null,
      status: project?.status,
      start_date: "",
      end_date: null,
      budget_amount: null,
      customer_id: 0,
    },
  });

  useEffect(() => {
    if (project) {
      UpdateProjectForm.reset({
        ...project,
        customer_id: project.customer?.id,
      });
    }
  }, [project, UpdateProjectForm]);

  const onUpdateProject = (values: TUpdateProjectDTO) => {
    mutate(values);
  };

  return {
    UpdateProjectForm,
    onUpdateProject,
    isUpdatingProject: isPending,
    isUpdateSuccess: isSuccess,
  };
};
