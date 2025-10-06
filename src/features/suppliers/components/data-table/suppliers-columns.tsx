"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TSupplierDTO } from "../../schema/supplier.schema";
import { SuppliersActionCell } from "./actions/suppliers-action-cell";

export const SuppliersColumns: ColumnDef<TSupplierDTO>[] = [
	{
		accessorKey: "registration_name",
		header: "Supplier",
	},
	{
		accessorKey: "party_identification_scheme",
		header: "Supplier Identification",
	},
	{
		accessorKey: "party_identification_value",
		header: "Identification Value",
	},
	{
		accessorKey: "bank_account",
		header: "Bank Account",
	},
	{
		accessorKey: "phone",
		header: "Phone",
	},
	// {
	// 	accessorKey: "website",
	// 	header: "Website",
	// },
	{
		accessorKey: "vat_number",
		header: "VAT Number",
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
			return <SuppliersActionCell row={row} />;
		},
	},
];
