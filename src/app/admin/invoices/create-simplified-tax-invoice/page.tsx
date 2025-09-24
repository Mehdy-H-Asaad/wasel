import { Skeleton } from "@/components/ui/skeleton";
import { CreateSimplifiedTaxInvoice } from "@/features/invoice/components/create-invoice/create-simplified-tax-invoice-form/CreateSimplifiedTaxInvoice";
import React, { Suspense } from "react";

const SimplifiedTaxInvoice = () => {
	return (
		<Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
			<CreateSimplifiedTaxInvoice />
		</Suspense>
	);
};

export default SimplifiedTaxInvoice;
