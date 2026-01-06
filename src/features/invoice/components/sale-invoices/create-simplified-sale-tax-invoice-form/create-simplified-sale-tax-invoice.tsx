"use client";
import { Form } from "@/components/ui/form";
import React from "react";
import { MainButton } from "@/components/common/MainButton";
import { InlineInvoiceLinesTable } from "../../invoice-lines/inline-invoice-lines-data-table";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateSimplifiedSaleTaxInvoice } from "@/features/invoice/hooks/sale-invoice/useCreateSimplifiedSaleTaxInvoice";
import { CreateSimplifiedSaleTaxInvoiceOptions } from "./CreateSimplifiedSaleTaxInvoiceOptions";
import { Save } from "lucide-react";
export const CreateSimplifiedSaleTaxInvoice = () => {
  const {
    CreateSimplifiedSaleTaxInvoiceForm,
    isCreatingSimplifiedSaleTaxInvoice,
    onCreateSimplifiedSaleTaxInvoice,
  } = useCreateSimplifiedSaleTaxInvoice({ documentType: "INVOICE" });

  return (
    <div className=" space-y-6">
      <Form {...CreateSimplifiedSaleTaxInvoiceForm}>
        <form
          onSubmit={CreateSimplifiedSaleTaxInvoiceForm.handleSubmit(
            onCreateSimplifiedSaleTaxInvoice
          )}
          className="flex flex-col gap-6"
        >
          {/* {!isPreviewing ? (
            <> */}
          <CreateSimplifiedSaleTaxInvoiceOptions />
          <InlineInvoiceLinesTable isSaleInvoice={true} />
          <Card className="border-2 ">
            <CardContent className="py-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Complete all required fields to create your invoice
                </p>
                <MainButton
                  type="submit"
                  className="gap-2"
                  isLoading={isCreatingSimplifiedSaleTaxInvoice}
                  loadingText="Creating Invoice..."
                >
                  <Save className="h-4 w-4" />
                  Create Cash Invoice
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
