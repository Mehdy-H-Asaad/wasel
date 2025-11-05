"use client";
import { Form } from "@/components/ui/form";
import React, { useState } from "react";
import { MainButton } from "@/components/common/MainButton";
import { CreateSimplifiedTaxInvoiceOptions } from "./CreateSimplifiedTaxInvoiceOptions";
import { InlineInvoiceLinesTable } from "../invoice-lines/inline-invoice-lines-table/inline-invoice-lines-data-table";
import { InvoicePreview } from "../../invoice-preview/invoice-preview";
import { useCreateSimplifiedTaxInvoice } from "@/features/invoice/hooks/simplified-tax-invoice/useCreateSimplifiedTaxInvoice";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Eye, Save } from "lucide-react";
import { Separator } from "@/components/ui/separator";
export const CreateSimplifiedTaxInvoice = () => {
  const [isPreviewing, setIsPreviewing] = useState<boolean>(false);

  const {
    CreateSimplifiedTaxInvoiceForm,
    isCreatingSimplifiedTaxInvoice,
    onCreateSimplifiedTaxInvoice,
  } = useCreateSimplifiedTaxInvoice();

  const handlePreview = () => {
    setIsPreviewing(!isPreviewing);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Progress Steps */}
      <Card className="border-2">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div
                className={`flex items-center gap-3 ${
                  !isPreviewing ? "text-light-green" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold ${
                    !isPreviewing
                      ? "border-light-green bg-light-green/10"
                      : "border-muted-foreground/30 bg-muted/30"
                  }`}
                >
                  1
                </div>
                <div>
                  <div className="font-semibold">Invoice Details</div>
                  <div className="text-xs text-muted-foreground">
                    Configure invoice information
                  </div>
                </div>
              </div>
              <Separator className="flex-1 max-w-20" />
              <div
                className={`flex items-center gap-3 ${
                  isPreviewing ? "text-light-green" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold ${
                    isPreviewing
                      ? "border-light-green bg-light-green/10"
                      : "border-muted-foreground/30 bg-muted/30"
                  }`}
                >
                  2
                </div>
                <div>
                  <div className="font-semibold">Preview & Submit</div>
                  <div className="text-xs text-muted-foreground">
                    Review and create invoice
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Form {...CreateSimplifiedTaxInvoiceForm}>
        <form
          onSubmit={CreateSimplifiedTaxInvoiceForm.handleSubmit(
            onCreateSimplifiedTaxInvoice
          )}
          className="flex flex-col gap-6"
        >
          {!isPreviewing ? (
            <>
              <CreateSimplifiedTaxInvoiceOptions />
              <InlineInvoiceLinesTable />
              <Card className="border-2 sticky bottom-4 shadow-lg">
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
              <InvoicePreview form={CreateSimplifiedTaxInvoiceForm} />
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
                      disabled={
                        isCreatingSimplifiedTaxInvoice ||
                        !CreateSimplifiedTaxInvoiceForm.formState.isValid
                      }
                    >
                      <Save className="h-4 w-4" />
                      {isCreatingSimplifiedTaxInvoice
                        ? "Creating Invoice..."
                        : "Create Simplified Tax Invoice"}
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
