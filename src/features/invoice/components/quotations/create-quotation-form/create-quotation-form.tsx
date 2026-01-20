"use client";
import { Form } from "@/components/ui/form";
import React, { useEffect } from "react";
import { MainButton } from "@/components/common/MainButton";
import { InlineInvoiceLinesTable } from "../../invoice-lines/inline-invoice-lines-data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
import { useGetSingleQuotation } from "@/features/invoice/hooks/quotation/use-get-single-quotation";
import { useParams } from "next/navigation";
import { useUpdateQuotation } from "@/features/invoice/hooks/quotation/use-update-quotation";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateQuotation } from "@/features/invoice/hooks/quotation/use-create-quotation";
import { CreateTaxSaleInvoiceOptions } from "../../sale-invoices/create-tax-sale-invoice-form/CreateTaxSaleInvoiceOptions";

export const CreateQuotationForm = ({
  formType,
}: {
  formType: "CREATE" | "UPDATE";
}) => {
  const { id } = useParams<{ id: string }>();

  const { quotation, isLoadingQuotation } = useGetSingleQuotation({
    enabled: !!id,
    id,
  });

  const { CreateQuotationForm, isCreatingQuotation, onCreateQuotation } =
    useCreateQuotation();

  const { onUpdateQuotation, UpdateQuotationForm, isUpdatingQuotation } =
    useUpdateQuotation({ quotationId: id });

  useEffect(() => {
    if (quotation && formType === "UPDATE" && UpdateQuotationForm) {
      UpdateQuotationForm.reset({
        ...quotation,
        discount_amount: Number(quotation.discount_amount),
        customer_id: quotation.customer?.id,
        invoice_lines: quotation.invoice_lines.map((line) => ({
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
  }, [quotation, UpdateQuotationForm, formType]);

  if (isLoadingQuotation && formType === "UPDATE") {
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
          ? CreateQuotationForm
          : UpdateQuotationForm)}
      >
        <form
          onSubmit={
            formType === "CREATE"
              ? CreateQuotationForm.handleSubmit(onCreateQuotation)
              : UpdateQuotationForm.handleSubmit(onUpdateQuotation)
          }
          className="flex flex-col gap-6"
        >
          <CreateTaxSaleInvoiceOptions documentType="QUOTATION" />
          <InlineInvoiceLinesTable isSaleInvoice={false} isNote={false} />
          <Card className="border-2 ">
            <CardContent className="py-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Complete all required fields to create your quotation
                </p>
                <MainButton
                  type="submit"
                  className="gap-2"
                  isLoading={
                    formType === "CREATE"
                      ? isCreatingQuotation
                      : isUpdatingQuotation
                  }
                  loadingText={
                    formType === "CREATE"
                      ? "Creating Quotation..."
                      : "Updating Quotation..."
                  }
                >
                  <Save className="h-4 w-4" />
                  {formType === "CREATE"
                    ? "Create Quotation"
                    : "Update Quotation"}
                </MainButton>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};
