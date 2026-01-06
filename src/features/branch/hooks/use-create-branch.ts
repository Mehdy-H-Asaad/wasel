import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { BRANCHES_QUERY_KEY } from "../constants/branch.constants";
import {
  CreateBranchSchema,
  TBranchDTO,
  TCreateBranchDTO,
  BranchStatus,
} from "../schema/branch.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export const useCreateBranch = () => {
  const router = useRouter();
  const { mutate, isPending } = useApiMutation<TBranchDTO, TCreateBranchDTO>({
    axiosRequestMethod: "post",
    queryKey: [BRANCHES_QUERY_KEY],
    requestURL: `/${BRANCHES_QUERY_KEY}`,
    successMsg: `Branch ${CREATION_SUCCESS_MESSAGE}`,
    onSuccess: () => {
      CreateBranchForm.reset();
      router.push(`/admin/inventory/branches`);
    },
  });

  const CreateBranchForm = useForm<TCreateBranchDTO>({
    resolver: zodResolver(CreateBranchSchema),
    defaultValues: {
      name: "",
      phone: "",
      street: "",
      building_number: "",
      division: "",
      city: "",
      postal_code: "",
      address: "",
      status: BranchStatus.PENDING,
    },
  });

  const onCreateBranch = (values: TCreateBranchDTO) => {
    mutate(values);
  };

  return {
    onCreateBranch,
    CreateBranchForm,
    isCreatingBranch: isPending,
  };
};
