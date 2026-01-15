"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CLIENT_IDENTIFCATIONS } from "@/features/clients/constants/client.constant";
import { PAYMENTS_TYPES } from "../../../constants/invoice.constants";
import { FormatRiyal } from "@/components/common/format-riyal";
import { TInvoiceDTO } from "@/features/invoice/schema/invoice.schema";
// import { InvoiceStatusBadge } from "../../invoice-status-badge";
// import { TaxAuthorityStatusBadge } from "../../tax-authority-status-badge";
import { PurchaseInvoiceActionCell } from "./actions/purchase-invoice-action-cell";

export const PurchaseInvoicesColumns: ColumnDef<TInvoiceDTO>[] = [
	{
		accessorKey: "invoice_number",
		header: "#Invoice",
	},

	{
		accessorFn: row =>
			row.supplier ? row.supplier.registration_name : "Supplier",
		id: "supplier-company",
		header: "Supplier Company",
	},

	{
		accessorFn: row => (row.supplier ? row.supplier.phone : "Phone"),
		id: "supplier-phone",
		header: "Supplier Phone",
	},
	{
		accessorKey: "invoice_type",
		header: "Invoice Type",
		cell: ({ row }) => (
			<div>
				{row.original.invoice_type === "0100000"
					? "Tax Invoice"
					: "Simplified Tax Invoice"}
			</div>
		),
	},

	{
		accessorKey: "issue_date",
		header: "Issue Date",
	},
	{
		accessorKey: "party_identification_scheme",
		header: "Supplier Identification",
		cell: ({ row }) =>
			row.original.supplier ? (
				<div>
					{
						CLIENT_IDENTIFCATIONS.find(
							identification =>
								identification.value ===
								row.original.supplier.party_identification_scheme
						)?.label
					}
				</div>
			) : (
				<div>-</div>
			),
	},

	{
		accessorKey: "party_identification_value",
		header: "Identification Value",
		cell: ({ row }) =>
			row.original.supplier ? (
				<div>{row.original.supplier.party_identification_value}</div>
			) : (
				<div>-</div>
			),
	},

	{
		accessorKey: "payment_means_code",
		header: "Payment Type",
		cell: ({ row }) => (
			<div>
				{
					PAYMENTS_TYPES.find(
						payment =>
							payment.value.toString() ===
							row.original.payment_means_code.toString()
					)?.label
				}
			</div>
		),
	},
	//   {
	//     accessorKey: "document_currency_code",
	//     header: "Currency",
	//     cell: ({}) => <SaudiRiyalIcon className="w-4 h-4" />,
	//   },

	{
		accessorKey: "tax_amount",
		header: "Tax Amount",
		cell: ({ row }) => <FormatRiyal value={row.original.tax_amount} />,
	},
	{
		accessorKey: "tax_inclusive_amount",
		header: "Paid Amount",
		cell: ({ row }) => (
			<FormatRiyal value={row.original.tax_inclusive_amount} />
		),
	},
	// {
	// 	accessorKey: "classified_tax_category",
	// 	header: "Tax Category",
	// 	cell: ({ row }) => (
	// 		<div>
	// 			{
	// 				TAX_CATEGORIES.find(
	// 					category =>
	// 						category.value.toString() ===
	// 						row.original.classified_tax_category.toString()
	// 				)?.label
	// 			}
	// 		</div>
	// 	),
	// },

	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => <PurchaseInvoiceActionCell row={row} />,
	},
];
