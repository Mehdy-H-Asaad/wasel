import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { PROJECTS_QUERY_KEY } from "../constants/project.constants";
import {
  CreateProjectSchema,
  TProjectDTO,
  TCreateProjectDTO,
  ProjectStatus,
} from "../schema/project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export const useCreateProject = () => {
  const router = useRouter();
  const { mutate, isPending, isSuccess } = useApiMutation<
    TProjectDTO,
    TCreateProjectDTO
  >({
    axiosRequestMethod: "post",
    queryKey: [PROJECTS_QUERY_KEY],
    requestURL: `/projects`,
    successMsg: `Project ${CREATION_SUCCESS_MESSAGE}`,
    onSuccess: () => {
      CreateProjectForm.reset();
      router.push(`/admin/projects`);
    },
  });

  const CreateProjectForm = useForm<TCreateProjectDTO>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: "",
      description: null,
      status: ProjectStatus.DRAFT,
      start_date: "",
      end_date: null,
      budget_amount: null,
      customer_id: 0,
    },
  });

  const onCreateProject = (values: TCreateProjectDTO) => {
    mutate(values);
  };

  return {
    onCreateProject,
    CreateProjectForm,
    isCreatingProject: isPending,
    isCreateSuccess: isSuccess,
  };
};
