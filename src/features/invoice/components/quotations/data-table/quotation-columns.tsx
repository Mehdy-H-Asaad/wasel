"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TInvoiceDTO } from "../../../schema/invoice.schema";
import { PAYMENTS_TYPES } from "../../../constants/invoice.constants";
import { FormatRiyal } from "@/components/common/format-riyal";
import { CLIENT_IDENTIFCATIONS } from "@/features/clients/constants/client.constant";
import { InvoiceStatusBadge } from "../../invoice-status-badge";
import { TaxAuthorityStatusBadge } from "../../tax-authority-status-badge";
import { QuotationActionCell } from "./actions/quotation-action-cell";

export const QuotationColumns: ColumnDef<TInvoiceDTO>[] = [
	{
		accessorKey: "invoice_number",
		header: "#Quotation",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.original.status;
			return <InvoiceStatusBadge status={status} />;
		},
	},
	{
		accessorKey: "tax_authority_status",
		header: "Tax Authority",
		cell: ({ row }) => {
			const status = row.original.tax_authority_status;
			return <TaxAuthorityStatusBadge status={status} />;
		},
	},
	{
		accessorFn: (row) =>
			row.customer ? row.customer.registration_name : "Customer",
		id: "buyer-company",
		header: "Client Company",
	},

	{
		accessorFn: row => (row.customer ? row.customer.phone : "Phone"),
		id: "client-phone",
		header: "Client Phone",
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
		accessorKey: "invoice_type_code",
		header: "Type",
		cell: ({ row }) => (
			<div>
				{row.original.invoice_type_code === "388"
					? "Tax Invoice"
					: row.original.invoice_type_code === "383"
					? "Debit Note"
					: "Credit Note"}
			</div>
		),
	},
	{
		accessorKey: "issue_date",
		header: "Issue Date",
	},
	{
		accessorKey: "issue_time",
		header: "Issue Time",
	},
	{
		accessorKey: "party_identification_scheme",
		header: "Client Identification",
		cell: ({ row }) => (
			<div>
				{
					CLIENT_IDENTIFCATIONS.find(
						identification =>
							identification.value ===
							row.original.customer.party_identification_scheme
					)?.label
				}
			</div>
		),
	},

	{
		accessorKey: "party_identification_value",
		header: "Identification Value",
		cell: ({ row }) => (
			<div>{row.original.customer.party_identification_value}</div>
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
		cell: ({ row }) => <QuotationActionCell row={row} />,
	},
];
