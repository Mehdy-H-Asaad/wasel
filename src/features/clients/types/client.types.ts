export type TClientDTO = {
	id: number;
	BuildingNumber: string;
	CityName: string;
	CitySubdivisionName: string;
	CompanyID: string;
	Country: string;
	PartyIdentification: {
		schemeID: string;
		value: string;
	};
	PostalZone: string;
	RegistrationName: string;
	StreetName: string;
	email?: string;
	phone?: string;
	name?: string; // ONLY FOR SIMPLIFIED TAX INVOICE CLIENTS WITH ZERO TAX
};
