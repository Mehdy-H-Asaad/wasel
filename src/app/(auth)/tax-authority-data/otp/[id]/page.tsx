import React from 'react'
import { BranchTaxAuthorityOTP } from '@/features/branch/components/branch-tax-authority-otp'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <BranchTaxAuthorityOTP branchId={parseInt(id)} />
    )
}

export default page