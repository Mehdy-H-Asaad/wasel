export type TClientDTO = {
	id: number;
	registration_name: string;
	vat_number: string;
	street: string;
	building_number: string;
	division: string;
	city: string;
	postal_code: string;
	party_identification_scheme: string;
	party_identification_value: string;
	email?: string;
	phone?: string;
};
