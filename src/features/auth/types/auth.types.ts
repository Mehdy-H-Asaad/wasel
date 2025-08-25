export type TUserDTO = {
	created_at: string;
	updated_at: string;
	phone: string;
	registration_name: string;
	vat_number: string;
	invoicing_type: string;
	address: string;
	business_category: string;
	street: string;
	building_number: string;
	division: string;
	city: string;
	postal_code: string;
	party_identification_scheme: string;
	party_identification_value: string;
	id: number;
	email: string;
	is_completed: boolean;
	status: string;
	stage: string;
};

export type TAuthUserDTO = {
	access_token: string;
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
