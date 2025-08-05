import {
	requiredShortCode,
	requiredString,
} from "@/shared/shcema/validation.schema";
import { z } from "zod";

const PartyIdentificationSchema = z.object({
	schemeID: requiredString(100),
	value: requiredString(100),
});

export const clientSchema = z.object({
	PartyIdentification: PartyIdentificationSchema,
	email: requiredString(100).email("Email is not valid"),
	phone: requiredString(100),
	Country: requiredShortCode(2),
	StreetName: requiredString(100),
	BuildingNumber: requiredString(100),
	CitySubdivisionName: requiredString(100),
	CityName: requiredString(100),
	PostalZone: requiredString(10020),
	CompanyID: requiredString(100),
	RegistrationName: requiredString(100),
});
