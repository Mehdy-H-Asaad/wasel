import { Skeleton } from "@/components/ui/skeleton";
import { CreateTaxInvoice } from "@/features/invoice/components/create-invoice/create-tax-invoice-form/CreateTaxInvoice";
import React, { Suspense } from "react";

const TaxInvoicePage = () => {
	return (
		<Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
			<CreateTaxInvoice />
		</Suspense>
	);
};

export default TaxInvoicePage;
