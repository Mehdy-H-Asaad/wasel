"use client";
import { DataTable } from "@/components/common/DataTable";
import { InvoiceLinesColumns } from "./InvoiceLineColumns";
import { TCreateTaxInvoiceDTO } from "@/features/invoice/schema/tax-invoice.schema";
import { UseFormReturn } from "react-hook-form";
import { CreateInvoiceLine } from "../create-invoice-line/CreateInvoiceLine";
import { useInvoiceLineStore } from "@/features/invoice/store/invoice-line.store";
import { useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export type TCreateTaxInvoiceLines = {
	form: UseFormReturn<TCreateTaxInvoiceDTO>;
};

export const InvoiceLinesDataTable = () => {
	const { invoiceLinesTable } = useInvoiceLineStore();

	useEffect(() => {
		console.log(invoiceLinesTable);
	}, [invoiceLinesTable]);

	return (
		<Card className="border-2">
			<CardHeader>
				<div className="flex items-center gap-2">
					<ShoppingCart className="h-5 w-5 text-light-green" />
					<CardTitle>Invoice Line Items</CardTitle>
				</div>
				<CardDescription>
					Add products or services to this invoice
				</CardDescription>
			</CardHeader>
			<CardContent>
				<DataTable
					columns={InvoiceLinesColumns}
					data={invoiceLinesTable || []}
					searchableField="item_name"
					searchablePlaceholder="Search by item name..."
					skeletonRows={10}
					manualPagination={false}
				>
					<CreateInvoiceLine />
				</DataTable>
			</CardContent>
		</Card>
	);
};
