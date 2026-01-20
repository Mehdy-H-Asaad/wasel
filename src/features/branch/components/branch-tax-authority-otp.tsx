"use client";
import { useBranchTaxAuthorityOTP } from '../hooks/use-branch-tax-authority-otp'
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';

export const BranchTaxAuthorityOTP = ({ branchId }: { branchId: number }) => {
    const { CompleteBranchTaxAuthorityForm, onCompleteBranchTaxAuthority, isCompleteBranchTaxAuthority } = useBranchTaxAuthorityOTP({ branchId });
    return (
        <div
            className={
                "flex flex-col gap-6 items-center justify-center w-full h-screen"
            }
        >
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">ZATCA Phase 2 OTP Verification</CardTitle>
                    <CardDescription>
                        Enter the code sent to your ZATCA email address
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <Form {...CompleteBranchTaxAuthorityForm}>
                        <form onSubmit={CompleteBranchTaxAuthorityForm.handleSubmit(onCompleteBranchTaxAuthority)}>
                            <div className="grid place-content-center gap-6">
                                <FormField
                                    control={CompleteBranchTaxAuthorityForm.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <InputOTP {...field} maxLength={6}>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                        <InputOTPSlot index={1} />
                                                        <InputOTPSlot index={2} />
                                                    </InputOTPGroup>
                                                    <InputOTPSeparator />
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={3} />
                                                        <InputOTPSlot index={4} />
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    disabled={
                                        isCompleteBranchTaxAuthority ||
                                        CompleteBranchTaxAuthorityForm.formState.isSubmitting ||
                                        !CompleteBranchTaxAuthorityForm.formState.isValid
                                    }
                                >
                                    {isCompleteBranchTaxAuthority ? "Verifying..." : "Verify"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
