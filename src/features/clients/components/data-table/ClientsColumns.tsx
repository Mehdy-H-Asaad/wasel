"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TClientDTO } from "../../schema/client.schema";
import { ClientActionsCell } from "./actions/ClientActionsCell";

export const ClientsColumns: ColumnDef<TClientDTO>[] = [
	{
		accessorKey: "registration_name",
		header: "Client - Company",
	},
	{
		accessorKey: "party_identification_scheme",
		header: "Client Identification",
	},
	{
		accessorKey: "party_identification_value",
		header: "Identification Value ",
	},
	{
		accessorKey: "vat_number",
		header: "VAT Number ",
	},
	{
		accessorKey: "bank_account",
		header: "Bank Account",
	},
	{
		accessorKey: "phone",
		header: "Phone",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "whatsapp",
		header: "Whatsapp",
	},
	{
		accessorKey: "city",
		header: "City",
	},
	{
		accessorKey: "division",
		header: "District",
	},
	{
		accessorKey: "street",
		header: "Street",
	},
	{
		accessorKey: "building_number",
		header: "Building No.",
	},
	{
		accessorKey: "postal_code",
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
