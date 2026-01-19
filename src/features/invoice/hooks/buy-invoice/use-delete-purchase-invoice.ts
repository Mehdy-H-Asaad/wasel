import { DELETE_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { PURCHASE_INVOICES } from "../../constants/invoice.constants";
import { useApiMutation } from "@/shared/hooks/useApiMutation";

export const useDeletePurchaseInvoice = ({ id }: { id: number }) => {
  const { mutate, isPending } = useApiMutation<void, void>({
    axiosRequestMethod: "delete",
    queryKey: [PURCHASE_INVOICES],
    requestURL: `/${PURCHASE_INVOICES}/${id}`,
    successMsg: `Purchase Invoice ${DELETE_SUCCESS_MESSAGE}`,
  });

  const onDeletePurchaseInvoice = () => {
    mutate();
  };

  return { onDeletePurchaseInvoice, isDeletingPurchaseInvoice: isPending };
};
