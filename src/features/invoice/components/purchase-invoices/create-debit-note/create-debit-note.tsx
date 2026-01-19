"use client";
import { Form } from "@/components/ui/form";
import React, { useEffect } from "react";
import { useCreateDebitNote } from "../../../hooks/buy-invoice/use-create-debit-note";
import { MainButton } from "@/components/common/MainButton";
import { InlineInvoiceLinesTable } from "../../invoice-lines/inline-invoice-lines-data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
import { DebitNoteOptions } from "./debit-note-options";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { useGetSinglePurchaseInvoice } from "@/features/invoice/hooks/buy-invoice/use-get-single-purchase-invoice";

export const CreateDebitNote = () => {
    const searchParams = useSearchParams();

    const originalInvoiceId = searchParams.get("original_invoice_id");
    const { purchaseInvoice, isLoadingPurchaseInvoice } = useGetSinglePurchaseInvoice({
        id: originalInvoiceId || "",
        enabled: !!originalInvoiceId,
    });

    const {
        CreateDebitNoteForm,
        isCreatingDebitNote,
        onCreateDebitNote,
    } = useCreateDebitNote();

    useEffect(() => {
        if (purchaseInvoice && originalInvoiceId) {
            CreateDebitNoteForm.reset({
                ...purchaseInvoice,
                invoice_type_code: "383",
                original_invoice_id: originalInvoiceId,
                discount_amount: Number(purchaseInvoice.discount_amount),
                supplier_id: purchaseInvoice.supplier?.id,
                invoice_lines: purchaseInvoice.invoice_lines.map(line => ({
                    ...line,
                    price_discount: Number(line.price_discount),
                    tax_exemption_reason: line.tax_exemption_reason_code
                        ? line.tax_exemption_reason_code
                        : line.tax_exemption_reason,
                    tax_exemption_reason_code: line.tax_exemption_reason_code
                        ? line.tax_exemption_reason_code
                        : null,
                    classified_tax_category: line.classified_tax_category,
                    description: line.description,

                    item_id: Number(line.item?.id),
                    item_price: Number(line.item_price),
                    discount_amount: Number(line.discount_amount),
                    quantity: Number(line.quantity),
                })),
            });
        }
    }, [purchaseInvoice, originalInvoiceId, CreateDebitNoteForm]);



    if (isLoadingPurchaseInvoice) {
        return (
            <div className="w-full h-full flex items-center flex-col justify-center gap-4">
                <Skeleton className="h-[300px] w-full" />
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[100px] w-full" />
            </div>
        );
    }




    return (
        <div className=" space-y-6" key={originalInvoiceId || "new"}>
            <Form {...CreateDebitNoteForm}>
                <form
                    onSubmit={CreateDebitNoteForm.handleSubmit(onCreateDebitNote)}
                    className="flex flex-col gap-6"
                >
                    <DebitNoteOptions />
                    <InlineInvoiceLinesTable isSaleInvoice isNote />
                    <Card className="border-2 ">
                        <CardContent className="py-4">
                            <div className="flex items-center justify-between gap-4">
                                <p className="text-sm text-muted-foreground">
                                    Complete all required fields to create your debit note
                                </p>
                                <MainButton
                                    type="submit"
                                    className="gap-2"
                                    isLoading={isCreatingDebitNote}
                                    loadingText="Creating Debit Note..."
                                >
                                    <Save className="h-4 w-4" />
                                    Create Debit Note
                                </MainButton>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    );
};
