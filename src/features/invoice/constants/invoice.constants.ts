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
    case: "O",
    options: [
      {
        value: "VATEX-SA-OOS",
        label: "Services outside scope of VAT",
      },
    ],
  },
  {
    case: "E",
    options: [
      {
        value: "VATEX-SA-29",
        label: "Financial services",
      },
      {
        value: "VATEX-SA-29-7",
        label: "Life insurance Services",
      },
      {
        value: "VATEX-SA-30",
        label: "Real Estate Transactions",
      },
    ],
  },
  {
    case: "Z",
    options: [
      {
        value: "VATEX-SA-32",
        label: "Export of goods",
      },
      {
        value: "VATEX-SA-33",
        label: "Export of services",
      },
      {
        value: "VATEX-SA-34-1",
        label: "The international transport of goods",
      },
      {
        value: "VATEX-SA-34-2",
        label: "The international transport of passengers",
      },
      {
        value: "VATEX-SA-34-3",
        label:
          "Services directly connected and incidental to a supply of international passenger transport",
      },
      {
        value: "VATEX-SA-34-4",
        label: "Supply of a qualifiying means of transport",
      },
      {
        value: "VATEX-SA-34-5",
        label: "Any services relating to goods or passenger transportation ",
      },
      {
        value: "VATEX-SA-35",
        label: "Medicine and medical equipment",
      },
      {
        value: "VATEX-SA-36",
        label: "Qualifiying meals",
      },
      {
        value: "VATEX-SA-EDU",
        label: "Private education to citizen",
      },
      {
        value: "VATEX-SA-HEA",
        label: "Private healthcare to citizen",
      },
      {
        value: "VATEX-SA-MLTRY",
        label: "Supply of qualifying military goods",
      },
    ],
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
