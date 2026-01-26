"use client";
import { Form } from "@/components/ui/form";
import React, { useEffect } from "react";
import { useCreateSaleTaxInvoice } from "../../../hooks/sale-invoice/useCreateSaleTaxInvoice";
import { MainButton } from "@/components/common/MainButton";
import { InlineInvoiceLinesTable } from "../../invoice-lines/inline-invoice-lines-data-table";
// import { InvoicePreview } from "../../invoice-preview/invoice-preview";
import { Card, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
import { CreateTaxSaleInvoiceOptions } from "./CreateTaxSaleInvoiceOptions";
import { useGetSingleSaleInvoice } from "@/features/invoice/hooks/sale-invoice/use-get-single-sale-invoice";
import { useParams } from "next/navigation";
import { useUpdateSaleInvoice } from "@/features/invoice/hooks/sale-invoice/use-update-sale-invoice";
import { Skeleton } from "@/components/ui/skeleton";
// import { TCreateSaleTaxInvoiceDTO } from "@/features/invoice/schema/sale-tax-invoice.schema";
// import { toast } from "sonner";
export const CreateTaxSaleInvoiceForm = ({
	documentType,
	formType,
}: {
	documentType: "INVOICE" | "QUOTATION";
	formType: "CREATE" | "UPDATE";
}) => {
	// const [isPreviewing, setIsPreviewing] = useState<boolean>(false);

	const { id } = useParams<{ id: string }>();

	const { invoice, isLoadingInvoice } = useGetSingleSaleInvoice({
		enabled: !!id,
		id,
	});

	const {
		CreateSaleTaxInvoiceForm,
		isCreatingSaleTaxInvoice,
		onCreateSaleTaxInvoice,
	} = useCreateSaleTaxInvoice({ documentType });

	const { onUpdateSaleInvoice, UpdateSaleInvoiceForm, isUpdatingSaleInvoice } =
		useUpdateSaleInvoice({ documentType, invoiceId: id });

	useEffect(() => {
		if (invoice && formType === "UPDATE" && UpdateSaleInvoiceForm) {
			UpdateSaleInvoiceForm.reset({
				...invoice,
				discount_amount: Number(invoice.discount_amount),
				customer_id: invoice.customer?.id,
				project_id: invoice.project?.id,
				point_of_sale_id: invoice.point_of_sale?.id,
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
	}, [invoice, UpdateSaleInvoiceForm, formType]);

	if (isLoadingInvoice && formType === "UPDATE") {
		return (
			<div className="w-full h-full flex items-center flex-col justify-center gap-4">
				<Skeleton className="h-[300px] w-full" />
				<Skeleton className="h-[200px] w-full" />
				<Skeleton className="h-[50px] w-full" />
			</div>
		);
	}

	// const handlePreview = () => {
	//   setIsPreviewing(!isPreviewing);
	//   window.scrollTo({ top: 0 });
	// };

	// const handleSubmit = (values: TCreateSaleTaxInvoiceDTO) => {
	//   if (CreateSaleTaxInvoiceForm.formState.isValid) {
	//     onCreateSaleTaxInvoice(values);
	//   } else {
	//     toast.error("Please complete all required fields");
	//     setIsPreviewing(false);
	//   }
	// };

	console.log(CreateSaleTaxInvoiceForm.getValues());
	return (
		<div className=" space-y-6">
			<Form
				{...(formType === "CREATE"
					? CreateSaleTaxInvoiceForm
					: UpdateSaleInvoiceForm)}
			>
				<form
					// onSubmit={(e) => {
					//   e.preventDefault();
					//   handleSubmit(CreateSaleTaxInvoiceForm.getValues());
					// }}
					onSubmit={
						formType === "CREATE"
							? CreateSaleTaxInvoiceForm.handleSubmit(onCreateSaleTaxInvoice)
							: UpdateSaleInvoiceForm.handleSubmit(onUpdateSaleInvoice)
					}
					className="flex flex-col gap-6"
				>
					{/* {!isPreviewing ? (
            <> */}
					<CreateTaxSaleInvoiceOptions documentType={documentType} />
					<InlineInvoiceLinesTable isSaleInvoice isNote={false} />
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
											? isCreatingSaleTaxInvoice
											: isUpdatingSaleInvoice
									}
									loadingText={
										formType === "CREATE"
											? "Creating Invoice..."
											: "Updating Invoice..."
									}
								>
									<Save className="h-4 w-4" />
									{formType === "CREATE" ? "Create Invoice" : "Update Invoice"}
								</MainButton>
							</div>
						</CardContent>
					</Card>
					{/* </>
          ) : (
            <> */}
					{/* <InvoicePreview form={CreateSaleTaxInvoiceForm} /> */}
					{/* <Card className="border-2 bottom-4 shadow-lg">
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
                      isLoading={isCreatingSaleTaxInvoice}
                      loadingText="Creating Invoice..."
                    >
                      <Save className="h-4 w-4" />
                      Create Tax Invoice
                    </MainButton>
                  </div>
                </CardContent>
              </Card>
            </> */}
					{/* )} */}
				</form>
			</Form>
		</div>
	);
};
