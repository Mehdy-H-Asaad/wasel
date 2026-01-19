"use client";
import { useApiMutation } from "@/shared/hooks/useApiMutation";
import { PURCHASE_INVOICES } from "../../constants/invoice.constants";
import { CREATION_SUCCESS_MESSAGE } from "@/shared/data/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateDebitNoteSchema,
  TCreateDebitNoteDTO,
} from "../../schema/debit-note-schema";
import { useRouter } from "next/navigation";

export const useCreateDebitNote = () => {
  const router = useRouter();

  const { mutate, isPending } = useApiMutation<void, TCreateDebitNoteDTO>({
    axiosRequestMethod: "post",
    queryKey: [PURCHASE_INVOICES],
    requestURL: `/${PURCHASE_INVOICES}`,
    successMsg: `Debit Note ${CREATION_SUCCESS_MESSAGE}`,
    axiosType: "private",
    onSuccess: () => {
      router.push(`/admin/purchases/debit-notes`);
    },
  });

  const CreateDebitNoteForm = useForm<TCreateDebitNoteDTO>({
    resolver: zodResolver(CreateDebitNoteSchema),
    mode: "onChange",
  });

  const onCreateDebitNote = (values: TCreateDebitNoteDTO) => {
    mutate(values);
  };

  return {
    onCreateDebitNote,
    CreateDebitNoteForm,
    isCreatingDebitNote: isPending,
  };
};
