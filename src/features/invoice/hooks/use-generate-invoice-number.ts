// import { useApiMutation } from "@/shared/hooks/useApiMutation";
// import { INVOICE_NUMBER } from "../constants/invoice.constants";

// export const useGenerateInvoiceNumber = () => {
//   const { mutate, isPending } = useApiMutation<string>({
//     axiosRequestMethod: "post",
//     queryKey: [],
//     requestURL: `/sale-invoices/generate-invoice-number`,
//   });

//   return {
//     generateInvoiceNumber: mutate,
//     isGeneratingInvoiceNumber: isPending,
//   };
// };
