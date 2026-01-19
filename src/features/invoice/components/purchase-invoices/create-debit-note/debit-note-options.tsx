import { PAYMENTS_TYPES } from "@/features/invoice/constants/invoice.constants";
import { TCreateDebitNoteDTO } from "@/features/invoice/schema/debit-note-schema";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Receipt } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useGetSuppliers } from "@/features/suppliers/hooks/use-get-suppliers";

export const DebitNoteOptions = () => {
    const form = useFormContext<TCreateDebitNoteDTO>();

    // Watch form values for display
    const supplierId = form.watch("supplier_id");
    const paymentMeansCode = form.watch("payment_means_code");
    const pricesIncludeTax = form.watch("prices_include_tax");
    const actualDeliveryDate = form.watch("actual_delivery_date");
    const note = form.watch("note");

    // Get client data for display
    const { suppliers } = useGetSuppliers({
        filters: {
            limit: 30,
            page: 1,
        },
    });

    // Find selected client name
    const selectedSupplier = suppliers?.find(supplier => supplier.id === supplierId);
    const supplierName = selectedSupplier?.registration_name || "Not selected";

    // Find selected payment method
    const selectedPayment = PAYMENTS_TYPES.find(
        payment => payment.value.toString() === paymentMeansCode
    );
    const paymentMethodLabel = selectedPayment?.label || "Not selected";

    // Format prices include tax
    const pricesIncludeTaxLabel =
        pricesIncludeTax === true
            ? "Yes"
            : pricesIncludeTax === false
                ? "No"
                : "Not selected";

    // Format delivery date
    const deliveryDateLabel = actualDeliveryDate
        ? new Date(actualDeliveryDate).toLocaleDateString()
        : "Not selected";

    return (
        <div className="flex flex-col gap-6">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-light-green/10 rounded-lg">
                        <Receipt className="h-6 w-6 text-light-green" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Debit Note Information</h2>
                        <p className="text-sm text-muted-foreground">
                            Review debit note information before submission
                        </p>
                    </div>
                </div>
                <div className="w-fit self-end text-light-green font-bold text-sm border-2 border-light-green py-2 px-6 rounded-full bg-light-green/5">
                    Debit Note
                </div>
            </div>

            {/* Main Information Card */}
            <Card className="border-2">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CardTitle>Supplier & Basic Information</CardTitle>
                    </div>
                    <CardDescription>
                        Debit note details and configuration
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Supplier - Company */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground">
                                Supplier - Company
                            </label>
                            <p className="text-base font-medium">{supplierName}</p>
                        </div>

                        {/* Payment Method */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground">
                                Payment Method
                            </label>
                            <p className="text-base font-medium">{paymentMethodLabel}</p>
                        </div>

                        {/* Prices Include Tax */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground">
                                Prices Include Tax
                            </label>
                            <p className="text-base font-medium">{pricesIncludeTaxLabel}</p>
                        </div>

                        {/* Delivery Date */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground">
                                Delivery Date
                            </label>
                            <p className="text-base font-medium">{deliveryDateLabel}</p>
                        </div>
                    </div>

                    {/* Note Section */}
                    {note && (
                        <div className="mt-6 flex flex-col space-y-2">
                            <label className="text-sm font-semibold text-muted-foreground">
                                Note
                            </label>
                            <div className="rounded-md border bg-muted/30 p-4">
                                <p className="text-sm whitespace-pre-wrap">{note}</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
