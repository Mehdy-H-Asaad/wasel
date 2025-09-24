import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { CLIENTS } from "../constants/client.constant";
import { UPDATE_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { clientSchema } from "../schema/client.schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TClientDTO } from "../types/client.types";

export const useUpdateClient = (client: TClientDTO) => {
	const { mutate, isPending } = useApiMutation<TClientDTO, TUpdateClientDTO>({
		axiosRequestMethod: "patch",
		queryKey: [CLIENTS],
		requestURL: `/${CLIENTS}/${client.id}`,
		successMsg: `Client ${UPDATE_SUCCESS_MESSAGE}`,
	});

	const updateClientSchema = clientSchema;

	type TUpdateClientDTO = z.infer<typeof updateClientSchema>;

	const UpdateClientForm = useForm<TUpdateClientDTO>({
		resolver: zodResolver(updateClientSchema),
		defaultValues: {
			registration_name: client.registration_name,
			vat_number: client.vat_number,
			street: client.street,
			building_number: client.building_number,
			division: client.division,
			city: client.city,
			postal_code: client.postal_code,
			party_identification_scheme: client.party_identification_scheme,
			party_identification_value: client.party_identification_value,
		},
	});

	const onUpdateClient = (values: TUpdateClientDTO) => {
		mutate(values);
	};

	return {
		onUpdateClient,
		UpdateClientForm,
		isUpdatingClient: isPending,
	};
};
