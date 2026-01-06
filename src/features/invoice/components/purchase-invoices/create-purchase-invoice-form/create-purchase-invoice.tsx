"use client";
import { Form } from "@/components/ui/form";
import React from "react";
import { useCreatePurchaseInvoice } from "../../../hooks/buy-invoice/use-create-purchase-invoices";
import { MainButton } from "@/components/common/MainButton";
import { CreatePurchaseInvoiceOptions } from "./create-purchase-invoice-options";
import { InlineInvoiceLinesTable } from "../../invoice-lines/inline-invoice-lines-data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
export const CreatePurchaseInvoice = () => {
  const {
    CreatePurchaseInvoiceForm,
    isCreatingPurchaseInvoice,
    onCreatePurchaseInvoice,
  } = useCreatePurchaseInvoice();

  return (
    <div className=" space-y-6">
      <Form {...CreatePurchaseInvoiceForm}>
        <form
          onSubmit={CreatePurchaseInvoiceForm.handleSubmit(
            onCreatePurchaseInvoice
          )}
          className="flex flex-col gap-6"
        >
          {/* {!isPreviewing ? (
            <> */}
          <CreatePurchaseInvoiceOptions />
          <InlineInvoiceLinesTable isSaleInvoice={false} />
          <Card className="border-2 ">
            <CardContent className="py-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Complete all required fields to create your invoice
                </p>
                <MainButton
                  type="submit"
                  className="gap-2"
                  isLoading={isCreatingPurchaseInvoice}
                  loadingText="Creating Invoice..."
                >
                  <Save className="h-4 w-4" />
                  Create Purchase Invoice
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
