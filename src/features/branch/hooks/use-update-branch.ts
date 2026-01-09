import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { BRANCHES_QUERY_KEY } from "../constants/branch.constants";
import { UPDATE_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { UpdateBranchSchema, TUpdateBranchDTO } from "../schema/branch.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TBranchDTO } from "../schema/branch.schema";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useUpdateBranch = ({ branch }: { branch?: TBranchDTO }) => {
	const router = useRouter();
	const { mutate, isPending } = useApiMutation<TBranchDTO, TUpdateBranchDTO>({
		axiosRequestMethod: "patch",
		queryKey: [BRANCHES_QUERY_KEY],
		requestURL: branch ? `/branches/${branch.id}` : "",
		successMsg: `Branch ${UPDATE_SUCCESS_MESSAGE}`,
		onSuccess: () => {
			router.push("/admin/inventory/branches");
		},
	});

	const UpdateBranchForm = useForm<TUpdateBranchDTO>({
		resolver: zodResolver(UpdateBranchSchema),
		defaultValues: {
			name: "",
			phone: "",
			street: "",
			building_number: "",
			division: "",
			city: "",
			postal_code: "",
			address: "",
			status: branch?.status,
		},
	});

	useEffect(() => {
		if (branch) {
			UpdateBranchForm.reset({
				name: branch.name,
				phone: branch.phone,
				street: branch.street,
				building_number: branch.building_number,
				division: branch.division,
				city: branch.city,
				postal_code: branch.postal_code,
				address: branch.address,
				status: branch.status,
			});
		}
	}, [branch, UpdateBranchForm]);

	const onUpdateBranch = (values: TUpdateBranchDTO) => {
		mutate(values);
	};

	return {
		UpdateBranchForm,
		onUpdateBranch,
		isUpdatingBranch: isPending,
	};
};
