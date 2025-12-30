import { FormatRiyal } from "@/components/common/format-riyal";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { TTaxInvoiceLineDTO } from "../../schema/invoice-lines.schema";
import { useGetSingleStock } from "@/features/stock/hooks/use-get-single-stock";
import { Skeleton } from "@/components/ui/skeleton";

type TCalculatedInvoiceLine = TTaxInvoiceLineDTO & {
  line_extension_amount: number;
  tax_amount: number;
  rounding_amount: number;
};

type TInvoicePreviewRowProps = {
  invoiceLine: TCalculatedInvoiceLine;
};

export const InvoicePreviewRow = ({ invoiceLine }: TInvoicePreviewRowProps) => {
  const { stock, isLoadingStock } = useGetSingleStock({
    id: invoiceLine.item_id,
  });

  return isLoadingStock ? (
    <TableRow>
      <TableCell colSpan={9}>
        <Skeleton className="h-[31px] w-full" />
      </TableCell>
    </TableRow>
  ) : (
    <TableRow>
      <TableCell className="font-medium">{stock?.name}</TableCell>
      <TableCell>
        <FormatRiyal value={invoiceLine.item_price ?? 0} />{" "}
      </TableCell>
      <TableCell>{invoiceLine.quantity}</TableCell>
      <TableCell>{invoiceLine.classified_tax_category}</TableCell>
      <TableCell>
        <FormatRiyal value={invoiceLine.discount_amount || 0} />
      </TableCell>
      <TableCell>
        <FormatRiyal value={invoiceLine.line_extension_amount} />
      </TableCell>
      <TableCell>
        <FormatRiyal value={invoiceLine.tax_amount} />{" "}
      </TableCell>
      <TableCell className="text-right font-semibold">
        <FormatRiyal value={invoiceLine.rounding_amount} />
      </TableCell>
      <TableCell>{invoiceLine.description}</TableCell>
    </TableRow>
  );
};
