"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TClientDTO } from "../../types/client.types";
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
