"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { MainButton } from "@/components/common/MainButton";
import { TInvoiceDTO } from "../../../schema/invoice.schema";
import { CLIENT_IDENTIFCATIONS } from "@/features/clients/constants/client.constant";
import { PAYMENTS_TYPES } from "../../../constants/invoice.constants";
import { FormatRiyal } from "@/components/common/format-riyal";

export const QuotationColumns: ColumnDef<TInvoiceDTO>[] = [
  {
    accessorKey: "invoice_number",
    header: "#Quotation",
  },
  {
    accessorFn: (row) =>
      row.customer ? row.customer.registration_name : "Customer",
    id: "buyer-company",
    header: "Customer",
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
    accessorKey: "party_identification_scheme",
    header: "Client Identification",
    cell: ({ row }) => (
      <div>
        {
          CLIENT_IDENTIFCATIONS.find(
            (identification) =>
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
            (payment) =>
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
    cell: ({ row }) => {
      const invoice = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <Link href={`/admin/invoices/invoice-details/${invoice.id}`}>
              <MainButton>Invoice Details</MainButton>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
