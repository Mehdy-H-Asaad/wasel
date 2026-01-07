import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { TSupplierDTO } from "../schema/supplier.schema";
import {
	TUpdateSupplierDTO,
	UpdateSupplierSchema,
} from "../schema/supplier.schema";
import { SUPPLIERS_QUERY_KEY } from "../constants/supplier.constants";
import { SUPPLIERS } from "../constants/supplier.constants";
import { UPDATE_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useUpdateSupplier = ({
	supplier,
}: {
	supplier?: TSupplierDTO;
}) => {
	const router = useRouter();
	const { mutate, isPending } = useApiMutation<
		TSupplierDTO,
		TUpdateSupplierDTO
	>({
		axiosRequestMethod: "patch",
		queryKey: [SUPPLIERS_QUERY_KEY],
		requestURL: supplier ? `/${SUPPLIERS}/${supplier.id}` : "",
		successMsg: `Supplier ${UPDATE_SUCCESS_MESSAGE}`,
		onSuccess: () => {
			router.push("/admin/contacts/suppliers");
		},
	});

	const UpdateSupplierForm = useForm<TUpdateSupplierDTO>({
		resolver: zodResolver(UpdateSupplierSchema),
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
			email: "",
			whatsapp: "",
		},
	});

	useEffect(() => {
		if (supplier) {
			UpdateSupplierForm.reset({
				registration_name: supplier.registration_name,
				vat_number: supplier.vat_number,
				street: supplier.street,
				building_number: supplier.building_number,
				division: supplier.division,
				city: supplier.city,
				postal_code: supplier.postal_code,
				party_identification_scheme: supplier.party_identification_scheme,
				party_identification_value: supplier.party_identification_value,
				phone: supplier.phone,
				website: supplier.website,
				bank_account: supplier.bank_account,
				notes: supplier.notes,
				email: supplier.email,
				whatsapp: supplier.whatsapp,
			});
		}
	}, [supplier, UpdateSupplierForm]);

	const onUpdateSupplier = (values: TUpdateSupplierDTO) => {
		mutate(values);
	};

	return {
		UpdateSupplierForm,
		onUpdateSupplier,
		isUpdatingSupplier: isPending,
	};
};
