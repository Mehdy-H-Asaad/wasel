import { TClientDTO } from "@/features/clients/types/client.types";

export type TInvoiceDTO = {
	id: number;
	SellerInfo: TClientDTO;
	BuyerInfo: TClientDTO;

	InvoiceType: string;
	InvoiceTypeCode: string;
	IssueDate: string;
	IssueTime: string;
	DocumentCurrencyCode: string;
	LineExtensionAmount: string;
	DiscountAmount: string;
	TaxableAmount: string;
	TaxAmount: string;
	TaxInclusiveAmount: string;
	PayableAmount: string;
	ClassifiedTaxCategory: string;
	Note?: string;

	ActualDeliveryDate: string;
	PaymentMeansCode: string;
	OriginalInvoiceID?: string;
	InstructionNote?: string;
	invoiceLines: TTaxInvoiceLineDTO[];
};

export type TTaxInvoiceDTO = TInvoiceDTO;

export type TSimplifiedTaxInvoiceDTO = TInvoiceDTO & {
	BuyerInfo: {
		PartyIdentification: {
			schemeID: string;
			value: string;
		};
		RegistrationName: string;
	};
};

export type TTaxInvoiceLineDTO = {
	id?: string;
	BaseAmount: string;
	InvoicedQuantity: {
		unitCode: string;
		value: string;
	};
	DiscountAmount?: string;
	LineExtensionAmount: string;
	TaxAmount: string;
	RoundingAmount: string;
	TaxExemptionReasonCode?: string;
	TaxExemptionReason?: string;
	Name: string;
};

export type TCreateTaxInvoiceLineDTO = Omit<TTaxInvoiceLineDTO, "id">;
export type TUpdateTaxInvoiceLineDTO = TTaxInvoiceLineDTO;
