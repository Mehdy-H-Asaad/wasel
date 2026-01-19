import { Skeleton } from "@/components/ui/skeleton";
import { CreateDebitNote } from "@/features/invoice/components/purchase-invoices/create-debit-note/create-debit-note";
import React, { Suspense } from "react";

const DebitNotePage = () => {
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
            <CreateDebitNote />
        </Suspense>
    );
};

export default DebitNotePage;
