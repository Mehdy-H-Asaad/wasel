"use client";
import { Form } from "@/components/ui/form";
import React from "react";
import { useCreateSaleTaxInvoice } from "../../../hooks/sale-invoice/useCreateSaleTaxInvoice";
import { MainButton } from "@/components/common/MainButton";
import { InlineInvoiceLinesTable } from "../../invoice-lines/inline-invoice-lines-data-table";
// import { InvoicePreview } from "../../invoice-preview/invoice-preview";
import { Card, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
import { CreateTaxSaleInvoiceOptions } from "./CreateTaxSaleInvoiceOptions";
// import { TCreateSaleTaxInvoiceDTO } from "@/features/invoice/schema/sale-tax-invoice.schema";
// import { toast } from "sonner";
export const CreateTaxSaleInvoiceForm = ({
  documentType,
}: {
  documentType: "INVOICE" | "QUOTATION";
}) => {
  // const [isPreviewing, setIsPreviewing] = useState<boolean>(false);

  const {
    CreateSaleTaxInvoiceForm,
    isCreatingSaleTaxInvoice,
    onCreateSaleTaxInvoice,
  } = useCreateSaleTaxInvoice({ documentType });

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

  return (
    <div className=" space-y-6">
      <Form {...CreateSaleTaxInvoiceForm}>
        <form
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   handleSubmit(CreateSaleTaxInvoiceForm.getValues());
          // }}
          onSubmit={CreateSaleTaxInvoiceForm.handleSubmit(
            onCreateSaleTaxInvoice
          )}
          className="flex flex-col gap-6"
        >
          {/* {!isPreviewing ? (
            <> */}
          <CreateTaxSaleInvoiceOptions documentType={documentType} />
          <InlineInvoiceLinesTable isSaleInvoice />
          <Card className="border-2 ">
            <CardContent className="py-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Complete all required fields to create your invoice
                </p>
                <MainButton
                  type="submit"
                  className="gap-2"
                  isLoading={isCreatingSaleTaxInvoice}
                  loadingText="Creating Invoice..."
                >
                  <Save className="h-4 w-4" />
                  Create Invoice
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
