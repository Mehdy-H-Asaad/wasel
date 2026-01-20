"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import { useForgotPassword } from '../hooks/use-forgot-password'
import { Input } from '@/components/ui/input'
import { MainButton } from '@/components/common/MainButton'

export const ForgotPasswordForm = () => {
    const { ForgotPasswordForm, onForgotPassword, isForgotPasswordPending } = useForgotPassword();

    return (
        <div
            className={
                "flex flex-col gap-6 items-center justify-center w-full h-screen"
            }
        >
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Forgot Password</CardTitle>
                    <CardDescription>
                        Enter your email address to reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <Form {...ForgotPasswordForm}>
                        <form onSubmit={ForgotPasswordForm.handleSubmit(onForgotPassword)}>
                            <div className="grid gap-6">
                                <FormField
                                    control={ForgotPasswordForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Email" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <MainButton
                                    type="submit"
                                    className="w-fit ml-auto"
                                    disabled={isForgotPasswordPending || ForgotPasswordForm.formState.isSubmitting || !ForgotPasswordForm.formState.isValid}
                                    isLoading={isForgotPasswordPending}
                                    loadingText="Sending Reset Link..."
                                >
                                    Send Reset Link
                                </MainButton>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
