"use client";
import { Form } from "@/components/ui/form";
import React, { useEffect } from "react";
import { MainButton } from "@/components/common/MainButton";
import { InlineInvoiceLinesTable } from "../../invoice-lines/inline-invoice-lines-data-table";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateSimplifiedSaleTaxInvoice } from "@/features/invoice/hooks/sale-invoice/useCreateSimplifiedSaleTaxInvoice";
import { CreateSimplifiedSaleTaxInvoiceOptions } from "./CreateSimplifiedSaleTaxInvoiceOptions";
import { Save } from "lucide-react";
import { useGetSingleSaleInvoice } from "@/features/invoice/hooks/sale-invoice/use-get-single-sale-invoice";
import { useParams } from "next/navigation";
import { useUpdateSimplifiedSaleInvoice } from "@/features/invoice/hooks/sale-invoice/use-update-simplified-sale-invoice";
import { Skeleton } from "@/components/ui/skeleton";

export const CreateSimplifiedSaleTaxInvoice = ({
	formType,
}: {
	formType: "CREATE" | "UPDATE";
}) => {
	const { id } = useParams<{ id: string }>();

	const { invoice, isLoadingInvoice } = useGetSingleSaleInvoice({
		enabled: !!id,
		id,
	});

	const {
		CreateSimplifiedSaleTaxInvoiceForm,
		isCreatingSimplifiedSaleTaxInvoice,
		onCreateSimplifiedSaleTaxInvoice,
	} = useCreateSimplifiedSaleTaxInvoice({ documentType: "INVOICE" });

	const {
		onUpdateSimplifiedSaleInvoice,
		UpdateSimplifiedSaleInvoiceForm,
		isUpdatingSimplifiedSaleInvoice,
	} = useUpdateSimplifiedSaleInvoice({ invoiceId: id });

	useEffect(() => {
		if (invoice && formType === "UPDATE" && UpdateSimplifiedSaleInvoiceForm) {
			UpdateSimplifiedSaleInvoiceForm.reset({
				...invoice,
				discount_amount: Number(invoice.discount_amount),
				customer_id: invoice.customer?.id,
				invoice_lines: invoice.invoice_lines.map(line => ({
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
	}, [invoice, UpdateSimplifiedSaleInvoiceForm, formType]);

	if (isLoadingInvoice && formType === "UPDATE") {
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
					? CreateSimplifiedSaleTaxInvoiceForm
					: UpdateSimplifiedSaleInvoiceForm)}
			>
				<form
					onSubmit={
						formType === "CREATE"
							? CreateSimplifiedSaleTaxInvoiceForm.handleSubmit(
								onCreateSimplifiedSaleTaxInvoice
							)
							: UpdateSimplifiedSaleInvoiceForm.handleSubmit(
								onUpdateSimplifiedSaleInvoice
							)
					}
					className="flex flex-col gap-6"
				>
					{/* {!isPreviewing ? (
            <> */}
					<CreateSimplifiedSaleTaxInvoiceOptions />
					<InlineInvoiceLinesTable isSaleInvoice={true} isCreditNote={false} />
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
											? isCreatingSimplifiedSaleTaxInvoice
											: isUpdatingSimplifiedSaleInvoice
									}
									loadingText={
										formType === "CREATE"
											? "Creating Invoice..."
											: "Updating Invoice..."
									}
								>
									<Save className="h-4 w-4" />
									{formType === "CREATE"
										? "Create Cash Invoice"
										: "Update Cash Invoice"}
								</MainButton>
							</div>
						</CardContent>
					</Card>
					{/* </>
          ) : (
            <>
              <InvoicePreview form={CreateSimplifiedSaleTaxInvoiceForm} />
              <Card className="border-2  bottom-4 shadow-lg">
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
                        console.log(
                          CreateSimplifiedSaleTaxInvoiceForm.formState.errors
                        );
                        console.log(
                          CreateSimplifiedSaleTaxInvoiceForm.getValues()
                        );
                      }}
                      // disabled={
                      //   isCreatingSimplifiedSaleTaxInvoice ||
                      //   !CreateSimplifiedSaleTaxInvoiceForm.formState.isValid
                      // }
                    >
                      <Save className="h-4 w-4" />
                      {isCreatingSimplifiedSaleTaxInvoice
                        ? "Creating Invoice..."
                        : "Create Cash Invoice"}
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
