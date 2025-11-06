export const SALE_INVOICES = "sale-invoices";
export const PURCHASE_INVOICES = "buy-invoices";
export const QUOTATIONS = "quotations";
export const TAX_RATE = 15;
export const NO_TAX_RATE = 0;

export const VAT_DOCUMENTS = [
  {
    value: 388,
    label: "Tax Invoice",
  },
  {
    value: 383,
    label: "Debit Note",
  },
  {
    value: 381,
    label: "Credit Note",
  },
];

export const PAYMENTS_TYPES = [
  {
    value: 10,
    label: "Cash",
  },
  {
    value: 20,
    label: "Cheque",
  },
  {
    value: 30,
    label: "Credit Card",
  },
  {
    value: 31,
    label: "Debit Card",
  },
  {
    value: 42,
    label: "Bank Account",
  },
  {
    value: 48,
    label: "Bank Card",
  },
];

export const INVOICE_IDS = [
  {
    value: 1,
    label: "Invoice ID A",
  },
  {
    value: 2,
    label: "Invoice ID B",
  },
];

export const TAX_EXEMPTION_REASONS_CODES = [
  {
    value: "VATEX-SA-29",
    label: "VATEX-SA-29",
  },
  {
    value: "VATEX-SA-29-7",
    label: "VATEX-SA-29-7",
  },
  {
    value: "VATEX-SA-30",
    label: "VATEX-SA-30",
  },
  {
    value: "VATEX-SA-32",
    label: "VATEX-SA-32",
  },
  {
    value: "VATEX-SA-33",
    label: "VATEX-SA-33",
  },
  {
    value: "VATEX-SA-34-1",
    label: "VATEX-SA-34-1",
  },
  {
    value: "VATEX-SA-34-2",
    label: "VATEX-SA-34-2",
  },
  {
    value: "VATEX-SA-34-3",
    label: "VATEX-SA-34-3",
  },
  {
    value: "VATEX-SA-34-4",
    label: "VATEX-SA-34-4",
  },
  {
    value: "VATEX-SA-HEA",
    label: "VATEX-SA-HEA",
  },
  {
    value: "VATEX-SA-MLTRY",
    label: "VATEX-SA-MLTRY",
  },
];

export const TAX_CATEGORIES = [
  {
    value: "S",
    label: "VAT on Sales (15%)",
  },
  {
    value: "Z",
    label: "Zero rated goods (0%)",
  },
  {
    value: "E",
    label: "Exempt (0%)",
  },
  {
    value: "O",
    label: "Services outside scope of VAT (0%)",
  },
];
