import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { CLIENTS } from "../constants/client.constant";
import { UPDATE_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { UpdateClientSchema, TUpdateClientDTO } from "../schema/client.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TClientDTO } from "../schema/client.schema";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useUpdateClient = ({ client }: { client?: TClientDTO }) => {
	const router = useRouter();
	const { mutate, isPending } = useApiMutation<TClientDTO, TUpdateClientDTO>({
		axiosRequestMethod: "patch",
		queryKey: [CLIENTS],
		requestURL: client ? `/${CLIENTS}/${client.id}` : "",
		successMsg: `Client ${UPDATE_SUCCESS_MESSAGE}`,
		onSuccess: () => {
			router.push("/admin/contacts/clients");
		},
	});

	const UpdateClientForm = useForm<TUpdateClientDTO>({
		resolver: zodResolver(UpdateClientSchema),
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
			notes: "",
			bank_account: "",
			email: "",
			whatsapp: "",
		},
	});

	useEffect(() => {
		if (client) {
			UpdateClientForm.reset({
				registration_name: client.registration_name,
				vat_number: client.vat_number,
				street: client.street,
				building_number: client.building_number,
				division: client.division,
				city: client.city,
				postal_code: client.postal_code,
				party_identification_scheme: client.party_identification_scheme,
				party_identification_value: client.party_identification_value,
				phone: client.phone,
				notes: client.notes,
				bank_account: client.bank_account,
				email: client.email,
				whatsapp: client.whatsapp,
			});
		}
	}, [client, UpdateClientForm]);

	const onUpdateClient = (values: TUpdateClientDTO) => {
		mutate(values);
	};

	return {
		UpdateClientForm,
		onUpdateClient,
		isUpdatingClient: isPending,
	};
};
