"use client";
import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MainButton } from "@/components/common/MainButton";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useSignup } from "../hooks/useSignup";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";

export function SignUpForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { SignupForm, onSignUp, isSignupPending } = useSignup();

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={cn(" flex flex-col gap-6", className)} {...props}>
			<Card className="bg-[#171717] text-white">
				<CardHeader>
					<CardTitle>Create New Account</CardTitle>
					<CardDescription>
						Enter your Account details below to create new account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...SignupForm}>
						<form onSubmit={SignupForm.handleSubmit(onSignUp)}>
							<div className="flex flex-col gap-6">
								<FormField
									control={SignupForm.control}
									name="email"
									render={({ field }) => (
										<FormItem className="grid gap-3">
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input {...field} placeholder="Email" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={SignupForm.control}
									name="password"
									render={({ field }) => (
										<FormItem className="grid gap-3">
											<FormLabel>Password</FormLabel>
											<FormControl>
												<div className="relative">
													<Input
														{...field}
														type={showPassword ? "text" : "password"}
														placeholder="Password"
													/>
													<button
														type="button"
														className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400 hover:text-gray-200 focus:outline-none"
														onClick={handleShowPassword}
														aria-label={
															showPassword ? "Hide password" : "Show password"
														}
													>
														{showPassword ? <FaEyeSlash /> : <FaEye />}
													</button>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={SignupForm.control}
									name="confirm_password"
									render={({ field }) => (
										<FormItem className="grid gap-3">
											<FormLabel>Confirm Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													type={showPassword ? "text" : "password"}
													placeholder="Confirm Password"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex flex-col gap-3">
									<MainButton
										type="submit"
										className="w-full"
										disabled={isSignupPending || !SignupForm.formState.isValid}
										loading={isSignupPending}
										loadingText="Signing up"
									>
										Sign Up
									</MainButton>
									<div className="flex items-center">
										<MainButton className="hover:bg-black hover:text-white w-full bg-white text-black">
											Sign Up with Google
										</MainButton>
									</div>
								</div>
							</div>
							<div className="mt-4 text-center text-sm">
								Already have an account?{" "}
								<Link href="/login" className="underline underline-offset-4">
									Login
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
