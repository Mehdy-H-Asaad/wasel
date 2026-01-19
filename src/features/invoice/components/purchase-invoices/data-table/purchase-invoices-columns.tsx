"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CLIENT_IDENTIFCATIONS } from "@/features/clients/constants/client.constant";
import { PAYMENTS_TYPES, VAT_DOCUMENTS } from "../../../constants/invoice.constants";
import { FormatRiyal } from "@/components/common/format-riyal";
import { TInvoiceDTO } from "@/features/invoice/schema/invoice.schema";
// import { InvoiceStatusBadge } from "../../invoice-status-badge";
// import { TaxAuthorityStatusBadge } from "../../tax-authority-status-badge";
import { PurchaseInvoiceActionCell } from "./actions/purchase-invoice-action-cell";
import { Badge } from "@/components/ui/badge";
// import { InvoiceStatusBadge } from "../../invoice-status-badge";

export const PurchaseInvoicesColumns: ColumnDef<TInvoiceDTO>[] = [
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => <PurchaseInvoiceActionCell row={row} />,
	},
	{
		accessorKey: "invoice_number",
		header: "#Invoice",
	},
	// {
	// 	accessorKey: "status",
	// 	header: "Status",
	// 	cell: ({ row }) => {
	// 		const status = row.original.status;
	// 		return <InvoiceStatusBadge status={status} />;
	// 	},
	// },
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
					? "Purchase Invoice"
					: "Cash Invoice"}
			</div>
		),
	},
	{
		accessorKey: "invoice_type_code",
		header: "Type",
		cell: ({ row }) => {
			const invoiceTypeCode = row.original.invoice_type_code;

			const label = VAT_DOCUMENTS.find(document => document.value === Number(invoiceTypeCode))?.label;

			const badgeColor = invoiceTypeCode === "388" ? "bg-green-700 border-green-700 text-white" : invoiceTypeCode === "383" ? "bg-red-700 border-red-700 text-white" : "bg-blue-700 border-blue-700 text-white";

			return (
				<Badge className={badgeColor}>
					{label}
				</Badge>
			)
		},
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
	{
		accessorKey: "prices_include_tax",
		header: "Prices Include Tax",
		cell: ({ row }) => (
			<div>{row.original.prices_include_tax ? "Yes" : "No"}</div>
		),
	},
	{
		accessorKey: "line_extension_amount",
		header: "Subtotal Before Tax",
		cell: ({ row }) => <FormatRiyal value={row.original.line_extension_amount} />,
	},

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
];
