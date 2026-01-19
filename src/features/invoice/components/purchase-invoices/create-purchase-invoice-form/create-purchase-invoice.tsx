"use client";
import { Form } from "@/components/ui/form";
import React, { useEffect } from "react";
import { useCreatePurchaseInvoice } from "../../../hooks/buy-invoice/use-create-purchase-invoices";
import { MainButton } from "@/components/common/MainButton";
import { CreatePurchaseInvoiceOptions } from "./create-purchase-invoice-options";
import { InlineInvoiceLinesTable } from "../../invoice-lines/inline-invoice-lines-data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
import { useGetSinglePurchaseInvoice } from "@/features/invoice/hooks/buy-invoice/use-get-single-purchase-invoice";
import { useParams } from "next/navigation";
import { useUpdatePurchaseInvoice } from "@/features/invoice/hooks/buy-invoice/use-update-purchase-invoice";
import { Skeleton } from "@/components/ui/skeleton";

export const CreatePurchaseInvoice = ({
	formType,
}: {
	formType: "CREATE" | "UPDATE";
}) => {
	const { id } = useParams<{ id: string }>();

	const { purchaseInvoice, isLoadingPurchaseInvoice } =
		useGetSinglePurchaseInvoice({
			enabled: !!id,
			id,
		});

	const {
		CreatePurchaseInvoiceForm,
		isCreatingPurchaseInvoice,
		onCreatePurchaseInvoice,
	} = useCreatePurchaseInvoice();

	const {
		onUpdatePurchaseInvoice,
		UpdatePurchaseInvoiceForm,
		isUpdatingPurchaseInvoice,
	} = useUpdatePurchaseInvoice({ invoiceId: id });


	console.log(UpdatePurchaseInvoiceForm.formState.errors);
	useEffect(() => {
		if (purchaseInvoice && formType === "UPDATE" && UpdatePurchaseInvoiceForm) {
			UpdatePurchaseInvoiceForm.reset({
				...purchaseInvoice,
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
	}, [purchaseInvoice, UpdatePurchaseInvoiceForm, formType]);

	if (isLoadingPurchaseInvoice && formType === "UPDATE") {
		return (
			<div className="w-full h-full flex items-center flex-col justify-center gap-4">
				<Skeleton className="h-[300px] w-full" />
				<Skeleton className="h-[200px] w-full" />
				<Skeleton className="h-[50px] w-full" />
			</div>
		);
	}


	return (
		<div className=" space-y-6">
			<Form
				{...(formType === "CREATE"
					? CreatePurchaseInvoiceForm
					: UpdatePurchaseInvoiceForm)}
			>
				<form
					onSubmit={
						formType === "CREATE"
							? CreatePurchaseInvoiceForm.handleSubmit(onCreatePurchaseInvoice)
							: UpdatePurchaseInvoiceForm.handleSubmit(onUpdatePurchaseInvoice)
					}
					className="flex flex-col gap-6"
				>
					{/* {!isPreviewing ? (
            <> */}
					<CreatePurchaseInvoiceOptions />
					<InlineInvoiceLinesTable isSaleInvoice={false} isCreditNote={false} />
					<Card className="border-2 ">
						<CardContent className="py-4">
							<div className="flex items-center justify-between gap-4">
								<p className="text-sm text-muted-foreground">
									Complete all required fields to create your invoice
								</p>
								<MainButton

									type="submit"
									className="gap-2"
									isLoading={
										formType === "CREATE"
											? isCreatingPurchaseInvoice
											: isUpdatingPurchaseInvoice
									}
									loadingText={
										formType === "CREATE"
											? "Creating Invoice..."
											: "Updating Invoice..."
									}
								>
									<Save className="h-4 w-4" />
									{formType === "CREATE"
										? "Create Purchase Invoice"
										: "Update Purchase Invoice"}
								</MainButton>
							</div>
						</CardContent>
					</Card>
					{/* </>
          ) : (
            <>
              <InvoicePreview form={CreatePurchaseInvoiceForm} />
              <Card className="border-2 bottom-4 shadow-lg">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between gap-4">
                    <MainButton
                      onClick={handlePreview}
                      className="gap-2"
                      variant="outline"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Edit
                    </MainButton>
                    <MainButton
                      type="submit"
                      className="gap-2"
                      onClick={() => {
                        console.log(CreatePurchaseInvoiceForm.formState.errors);
                        console.log(CreatePurchaseInvoiceForm.getValues());
                      }}
                      // disabled={
                      //   isCreatingTaxInvoice ||
                      //   !CreateTaxInvoiceForm.formState.isValid
                      // }
                    >
                      <Save className="h-4 w-4" />
                      {isCreatingPurchaseInvoice
                        ? "Creating Invoice..."
                        : "Create Purchase Invoice"}
                    </MainButton>
                  </div>
                </CardContent>
              </Card>
            </>
          )} */}
				</form>
			</Form>
		</div>
	);
};
