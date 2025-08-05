import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { CLIENTS } from "../constants/client.constant";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { clientSchema } from "../schema/client.schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TClientDTO } from "../types/client.types";

export const useCreateClient = () => {
	const { isPending } = useApiMutation<TClientDTO, TCreateClientDTO>({
		axiosRequestMethod: "post",
		queryKey: [CLIENTS],
		requestURL: `/${CLIENTS}`,
		successMsg: `Client ${CREATION_SUCCESS_MESSAGE}`,
	});

	const createClientSchema = clientSchema;

	type TCreateClientDTO = z.infer<typeof createClientSchema>;

	const CreateClientForm = useForm<TCreateClientDTO>({
		resolver: zodResolver(createClientSchema),
		defaultValues: {
			BuildingNumber: "",
			email: "",
			phone: "",
			CityName: "",
			CitySubdivisionName: "",
			CompanyID: "",
			Country: "SA",
			PartyIdentification: {
				schemeID: "",
				value: "",
			},
			PostalZone: "",
			RegistrationName: "",
			StreetName: "",
		},
	});

	const onCreateClient = (values: TCreateClientDTO) => {
		// mutate(values);
		console.log(values);
	};

	return { onCreateClient, CreateClientForm, isCreatingClient: isPending };
};
