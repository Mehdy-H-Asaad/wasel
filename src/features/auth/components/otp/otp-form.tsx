"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	InputOTPSeparator,
} from "@/components/ui/input-otp";

import { UseFormReturn } from "react-hook-form";
import { TOTPVerifcationDTO } from "../../schema/otp.schema";

type OTPFormProps = {
	form: UseFormReturn<TOTPVerifcationDTO>;
	onSubmit: (values: TOTPVerifcationDTO) => void;
	isPending: boolean;
};

export const OTPForm = ({ form, onSubmit, isPending }: OTPFormProps) => {
	return (
		<div
			className={
				"flex flex-col gap-6 items-center justify-center w-full h-screen"
			}
		>
			<Card className="w-full max-w-sm">
				<CardHeader className="text-center">
					<CardTitle className="text-xl">OTP Verification</CardTitle>
					<CardDescription>
						Enter the code sent to your email address
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-6">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="grid place-content-center gap-6">
								<FormField
									control={form.control}
									name="code"
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
										isPending ||
										form.formState.isSubmitting ||
										!form.formState.isValid
									}
								>
									{isPending ? "Verifying..." : "Verify"}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};
