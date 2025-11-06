"use client";
import { Form } from "@/components/ui/form";
import React, { useState } from "react";
import { useCreateSaleTaxInvoice } from "../../../hooks/sale-invoice/useCreateSaleTaxInvoice";
import { MainButton } from "@/components/common/MainButton";
import { InlineInvoiceLinesTable } from "../../invoice-lines/inline-invoice-lines-table/inline-invoice-lines-data-table";
import { InvoicePreview } from "../../invoice-preview/invoice-preview";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Eye, Save } from "lucide-react";
import { CreateTaxSaleInvoiceOptions } from "./CreateTaxSaleInvoiceOptions";
export const CreateTaxSaleInvoiceForm = ({
  documentType,
}: {
  documentType: "invoice" | "quotation";
}) => {
  const [isPreviewing, setIsPreviewing] = useState<boolean>(false);

  const {
    CreateSaleTaxInvoiceForm,
    isCreatingSaleTaxInvoice,
    onCreateSaleTaxInvoice,
  } = useCreateSaleTaxInvoice({ documentType });

  const handlePreview = () => {
    setIsPreviewing(!isPreviewing);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className=" space-y-6">
      <Form {...CreateSaleTaxInvoiceForm}>
        <form
          onSubmit={CreateSaleTaxInvoiceForm.handleSubmit(
            onCreateSaleTaxInvoice
          )}
          className="flex flex-col gap-6"
        >
          {!isPreviewing ? (
            <>
              <CreateTaxSaleInvoiceOptions />
              <InlineInvoiceLinesTable isSaleInvoice />
              <Card className="border-2 ">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                      Complete all required fields to preview your invoice
                    </p>
                    <MainButton onClick={handlePreview} className="gap-2">
                      <Eye className="h-4 w-4" />
                      Preview Invoice
                      <ArrowRight className="h-4 w-4" />
                    </MainButton>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <InvoicePreview form={CreateSaleTaxInvoiceForm} />
              <Card className="border-2 sticky bottom-4 shadow-lg">
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
                        console.log(CreateSaleTaxInvoiceForm.formState.errors);
                        console.log(CreateSaleTaxInvoiceForm.getValues());
                      }}
                      // disabled={
                      //   isCreatingSaleTaxInvoice ||
                      //   !CreateSaleTaxInvoiceForm.formState.isValid
                      // }
                    >
                      <Save className="h-4 w-4" />
                      {isCreatingSaleTaxInvoice
                        ? "Creating Invoice..."
                        : "Create Tax Invoice"}
                    </MainButton>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};
