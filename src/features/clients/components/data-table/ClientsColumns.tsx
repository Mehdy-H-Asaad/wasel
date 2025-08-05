"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TClientDTO } from "../../types/client.types";
import { ClientActionsCell } from "./ClientActionsCell";

export const ClientsColumns: ColumnDef<TClientDTO>[] = [
	{
		accessorKey: "RegistrationName",
		header: "Client - Company",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "phone",
		header: "Phone",
	},
	{
		accessorKey: "PartyIdentification.schemeID",
		header: "Client Identification",
	},
	{
		accessorKey: "PartyIdentification.value",
		header: "Identification Value ",
	},
	{
		accessorKey: "CompanyID",
		header: "VAT Number ",
	},
	{
		accessorKey: "Country",
		header: "Country",
	},
	{
		accessorKey: "CityName",
		header: "City",
	},
	{
		accessorKey: "CitySubdivisionName",
		header: "District",
	},
	{
		accessorKey: "StreetName",
		header: "Street",
	},
	{
		accessorKey: "PostalZone",
		header: "Postal Code",
	},

	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return <ClientActionsCell row={row} />;
		},
	},
];
