import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { CreateSupplierSchema, TSupplierDTO } from "../schema/supplier.schema";
import { TCreateSupplierDTO } from "../schema/supplier.schema";
import {
	SUPPLIERS,
	SUPPLIERS_QUERY_KEY,
} from "../constants/supplier.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useCreateSupplier = () => {
	const { mutate, isPending } = useApiMutation<
		TSupplierDTO,
		TCreateSupplierDTO
	>({
		axiosRequestMethod: "post",
		queryKey: [SUPPLIERS_QUERY_KEY],
		requestURL: `/${SUPPLIERS}`,
		successMsg: `Supplier ${CREATION_SUCCESS_MESSAGE}`,
	});

	const CreateSupplierForm = useForm<TCreateSupplierDTO>({
		resolver: zodResolver(CreateSupplierSchema),
		defaultValues: {
			registration_name: "",
			vat_number: "",
			street: "",
			building_number: "",
			division: "",
			city: "",
			postal_code: "",
			party_identification_scheme: "",
			party_identification_value: "",
			phone: "",
			website: "",
			bank_account: "",
			notes: "",
		},
	});

	const onCreateSupplier = (values: TCreateSupplierDTO) => {
		mutate(values);
	};

	return {
		onCreateSupplier,
		CreateSupplierForm,
		isCreatingSupplier: isPending,
	};
};
