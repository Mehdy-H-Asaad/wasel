import { Skeleton } from "@/components/ui/skeleton";
import { InvoicesDataTable } from "@/features/invoice/components/data-table/InvoicesDataTable";
import React, { Suspense } from "react";
import { FaFileInvoiceDollar } from "react-icons/fa6";

const InvoicesPage = () => {
	return (
		<div>
			<div className="flex items-center gap-4 py-10">
				<FaFileInvoiceDollar size={40} />
				<div className="font-bold text-5xl">Invoices</div>
			</div>
			<Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
				<InvoicesDataTable />
			</Suspense>
		</div>
	);
};

export default InvoicesPage;
