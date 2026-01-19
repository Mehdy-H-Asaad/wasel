import React from 'react'
import { SaleInvoicesDataTable } from '@/features/invoice/components/sale-invoices/data-table/SaleInvoicesDataTable'

export default function CreditNotesPage() {
    return (
        <SaleInvoicesDataTable invoiceType="tax" VATDocument="CREDIT_NOTE" />
    )
}
