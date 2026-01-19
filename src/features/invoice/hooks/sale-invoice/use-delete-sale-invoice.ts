import { DELETE_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { SALE_INVOICES } from "../../constants/invoice.constants";
import { useApiMutation } from "@/shared/hooks/useApiMutation";

export const useDeleteSaleInvoice = ({ id }: { id: number }) => {
  const { mutate, isPending } = useApiMutation<void, void>({
    axiosRequestMethod: "delete",
    queryKey: [SALE_INVOICES],
    requestURL: `/${SALE_INVOICES}/${id}`,
    successMsg: `Invoice ${DELETE_SUCCESS_MESSAGE}`,
  });

  const onDeleteSaleInvoice = () => {
    mutate();
  };

  return { onDeleteSaleInvoice, isDeletingSaleInvoice: isPending };
};
