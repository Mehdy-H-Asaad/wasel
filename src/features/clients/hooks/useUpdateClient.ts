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
		axiosRequestMethod: "put",
		queryKey: [CLIENTS],
		requestURL: `/${CLIENTS}/${client.id}`,
		successMsg: `Client ${UPDATE_SUCCESS_MESSAGE}`,
	});

	const updateClientSchema = clientSchema;

	type TUpdateClientDTO = z.infer<typeof updateClientSchema>;

	const UpdateClientForm = useForm<TUpdateClientDTO>({
		resolver: zodResolver(updateClientSchema),
		defaultValues: {
			BuildingNumber: client.BuildingNumber,
			CityName: client.CityName,
			CitySubdivisionName: client.CitySubdivisionName,
			CompanyID: client.CompanyID,
			Country: client.Country,
			PartyIdentification: {
				schemeID: client.PartyIdentification.schemeID,
				value: client.PartyIdentification.value,
			},
			PostalZone: client.PostalZone,
			RegistrationName: client.RegistrationName,
			StreetName: client.StreetName,
			email: client.email,
			phone: client.phone,
		},
	});

	const onUpdateClient = (values: TUpdateClientDTO) => {
		mutate(values);
	};

	return { onUpdateClient, UpdateClientForm, isUpdatingClient: isPending };
};
