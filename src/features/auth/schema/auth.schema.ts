import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .min(1, "Required")
    .max(100, "Maximum 100 characters allowed. Please shorten your text")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Required")
    .max(100, "Maximum 100 characters allowed. Please shorten your text"),
  confirm_password: z
    .string()
    .min(1, "Required")
    .max(100, "Maximum 100 characters allowed. Please shorten your text"),
  name: z
    .string()
    .min(1, "Required")
    .max(100, "Maximum 100 characters allowed. Please shorten your text"),
  phone: z
    .string()
    .max(100, "Maximum 100 characters allowed. Please shorten your text")
    .optional(),
  code: z.string().min(6, "Required"),
  token: z.string().min(1, "Token is required"),
});

export const SignupSchema = authSchema
  .pick({
    email: true,
    password: true,
    confirm_password: true,
    name: true,
    phone: true,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });

export const LoginSchema = authSchema.pick({
  email: true,
  password: true,
});

export const OtpSchema = authSchema.pick({
  code: true,
  email: true,
});

export const AcceptInvitationSchema = authSchema
  .pick({
    token: true,
    password: true,
    confirm_password: true,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirm_password"],
      });
    }
  });

export const ResetPasswordSchema = authSchema.pick({
  password: true,
  email: true,
  confirm_password: true,
});

export const ForgotPasswordSchema = authSchema.pick({
  email: true,
});

export const ResetPasswordOTPSchema = authSchema.pick({
  code: true,
  email: true,
});

export type TSignupDTO = z.infer<typeof SignupSchema>;
export type TLoginDTO = z.infer<typeof LoginSchema>;
export type TOtpDTO = z.infer<typeof OtpSchema>;
export type TAcceptInvitationDTO = z.infer<typeof AcceptInvitationSchema>;
export type TResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;
export type TResetPasswordOTPDTO = z.infer<typeof ResetPasswordOTPSchema>;
export type TForgotPasswordDTO = z.infer<typeof ForgotPasswordSchema>;
