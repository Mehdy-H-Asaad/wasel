"use client";
import React from 'react'
import { OTPForm } from './otp-form'
import { useResetPasswordOTP } from '../../hooks/use-reset-password-otp'

export const OTPResetPassword = () => {
    const { ResetPasswordOTPForm, onResetPasswordOTP, isResetPasswordOTPPending } = useResetPasswordOTP();

    return (
        <OTPForm
            form={ResetPasswordOTPForm}
            onSubmit={onResetPasswordOTP}
            isPending={isResetPasswordOTPPending}
        />
    );
};
