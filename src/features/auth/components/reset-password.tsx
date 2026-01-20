"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import { useResetPassword } from '../hooks/use-reset-password'
import { Input } from '@/components/ui/input'
import { MainButton } from '@/components/common/MainButton'

export const ResetPasswordForm = () => {
    const { ResetPasswordForm, onResetPassword, isResetPasswordPending } = useResetPassword();

    return (
        <div
            className={
                "flex flex-col gap-6 items-center justify-center w-full h-screen"
            }
        >
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Reset Password</CardTitle>
                    <CardDescription>
                        Enter your new password
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <Form {...ResetPasswordForm}>
                        <form onSubmit={ResetPasswordForm.handleSubmit(onResetPassword)}>
                            <div className="grid gap-6">
                                <FormField
                                    control={ResetPasswordForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" placeholder="New Password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={ResetPasswordForm.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm New Password</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Confirm New Password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <MainButton
                                    type="submit"
                                    className="w-fit ml-auto"
                                    disabled={isResetPasswordPending || ResetPasswordForm.formState.isSubmitting || !ResetPasswordForm.formState.isValid}
                                    isLoading={isResetPasswordPending}
                                    loadingText="Resetting Password..."
                                >
                                    Reset Password
                                </MainButton>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
