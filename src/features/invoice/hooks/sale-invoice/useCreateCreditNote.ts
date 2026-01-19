"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { SALE_INVOICES } from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCreditNoteSchema,
  TCreateCreditNoteDTO,
  TCreditNoteDTO,
} from "../../schema/credit-note.schema";
import { useRouter } from "next/navigation";

export const useCreateCreditNote = () => {
  const router = useRouter();

  const { mutate, isPending } = useApiMutation<
    TCreditNoteDTO,
    TCreateCreditNoteDTO
  >({
    axiosRequestMethod: "post",
    queryKey: [SALE_INVOICES],
    requestURL: `/${SALE_INVOICES}`,
    successMsg: `Credit Note ${CREATION_SUCCESS_MESSAGE}`,
    axiosType: "private",
    onSuccess: () => {
      router.push(`/admin/sales/invoices/credit-notes`);
    },
  });

  const CreateCreditNoteForm = useForm<TCreateCreditNoteDTO>({
    resolver: zodResolver(CreateCreditNoteSchema),
    mode: "onChange",
    // defaultValues,
  });

  const onCreateCreditNote = (values: TCreateCreditNoteDTO) => {
    mutate(values);
  };

  return {
    onCreateCreditNote,
    CreateCreditNoteForm,
    isCreatingCreditNote: isPending,
    // originalInvoice: invoice,
  };
};
