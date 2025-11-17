import { TUserDTO } from "@/features/user/schema/user.schema";

export type TAuthUserDTO = {
	user: TUserDTO;
};

// export type TCompanyInfoDTO = {
// 	registraion_name: string;
// 	vat_number: string;
// 	invoicing_type: string;
// 	address: string;
// 	business_category: string;
// 	street: string;
// 	building_number: string;
// 	division: string;
// 	city: string;
// 	postal_code: string;
// 	party_identification_scheme: string;
// 	party_identification_value: string;
// 	phone: string;
// 	role: string;
// 	status: string;
// };

// export type TCreateCompanyInfoDTO = Omit<TCompanyInfoDTO, "role" | "status">;
