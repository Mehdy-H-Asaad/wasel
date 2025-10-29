"use client";
import { Form } from "@/components/ui/form";
import React, { useState } from "react";
import { useCreateTaxInvoice } from "../../../hooks/tax-invoice/useCreateTaxInvoice";
import { MainButton } from "@/components/common/MainButton";
import { CreateTaxInvoiceOptions } from "./CreateTaxInvoiceOptions";
import { InlineInvoiceLinesTable } from "../invoice-lines/inline-invoice-lines-table/inline-invoice-lines-data-table";
import { InvoicePreview } from "../../invoice-preview/invoice-preview";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Eye, Save } from "lucide-react";
export const CreateTaxInvoice = () => {
  const [isPreviewing, setIsPreviewing] = useState<boolean>(false);

  const { CreateTaxInvoiceForm, isCreatingTaxInvoice, onCreateTaxInvoice } =
    useCreateTaxInvoice();

  const handlePreview = () => {
    setIsPreviewing(!isPreviewing);
    window.scrollTo({ top: 0 });
  };

  console.log(CreateTaxInvoiceForm.formState.errors);
  return (
    <div className=" space-y-6">
      <Form {...CreateTaxInvoiceForm}>
        <form
          onSubmit={CreateTaxInvoiceForm.handleSubmit(onCreateTaxInvoice)}
          className="flex flex-col gap-6"
        >
          {!isPreviewing ? (
            <>
              <CreateTaxInvoiceOptions />
              <InlineInvoiceLinesTable />
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
              <InvoicePreview form={CreateTaxInvoiceForm} />
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
                      // disabled={
                      // 	isCreatingTaxInvoice ||
                      // 	!CreateTaxInvoiceForm.formState.isValid
                      // }
                    >
                      <Save className="h-4 w-4" />
                      {isCreatingTaxInvoice
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
