import React from 'react'
import { PurchaseInvoicesDataTable } from '@/features/invoice/components/purchase-invoices/data-table/purchase-invoices-data-table'

const page = () => {
    return (
        <PurchaseInvoicesDataTable VATDocument="DEBIT_NOTE" />
    )
}

export default page