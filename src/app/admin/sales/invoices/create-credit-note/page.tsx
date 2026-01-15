import { Skeleton } from "@/components/ui/skeleton";
import { CreateCreditNote } from "@/features/invoice/components/sale-invoices/create-credit-note-form/create-credit-note";
import React, { Suspense } from "react";

const CreditNotePage = () => {
	return (
		<Suspense
			fallback={
				<div className="w-full h-full flex items-center flex-col justify-center gap-4">
					<Skeleton className="h-[300px] w-full" />
					<Skeleton className="h-[200px] w-full" />
					<Skeleton className="h-[100px] w-full" />
				</div>
			}
		>
			<CreateCreditNote />
		</Suspense>
	);
};

export default CreditNotePage;
