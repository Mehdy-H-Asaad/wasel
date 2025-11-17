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
import { useSignup } from "../hooks/use-signup";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { GalleryVerticalEnd } from "lucide-react";

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
		<div className={cn("flex flex-col gap-5", className)} {...props}>
			<div className="flex flex-col gap-2">
				<div className="flex justify-center gap-2 ">
					<Link
						href="/"
						className="flex items-center gap-2 font-semibold text-main-green"
					>
						<div className="bg-main-green text-white flex size-6 items-center justify-center rounded-md ">
							<GalleryVerticalEnd className="size-4" />
						</div>
						Wasel
					</Link>
				</div>
			</div>
			<Card>
				<CardHeader className="text-center  ">
					<CardTitle className="text-2xl">Create your account</CardTitle>
					<CardDescription>
						Enter your details below to create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...SignupForm}>
						<form
							onSubmit={SignupForm.handleSubmit(onSignUp)}
							className="space-y-4"
						>
							<FormField
								control={SignupForm.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name</FormLabel>
										<FormControl>
											<Input {...field} placeholder="John Doe" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={SignupForm.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} placeholder="m@example.com" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={SignupForm.control}
									name="password"
									render={({ field }) => (
										<FormItem>
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
													>
														{showPassword ? (
															<FaEyeSlash className="size-4" />
														) : (
															<FaEye className="size-4" />
														)}
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
										<FormItem>
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
							</div>
							<FormField
								control={SignupForm.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Phone" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormItem className="pt-2">
								<MainButton
									type="submit"
									isLoading={isSignupPending}
									loadingText="Creating account..."
									disabled={isSignupPending}
									className="w-full"
								>
									Create Account
								</MainButton>
								<FormDescription className="text-center pt-2">
									Already have an account?{" "}
									<Link
										href="/login"
										className="text-main-green hover:underline"
									>
										Sign in
									</Link>
								</FormDescription>
							</FormItem>
						</form>
					</Form>
				</CardContent>
			</Card>
			<p className="px-6 text-center text-sm text-muted-foreground">
				By clicking continue, you agree to our{" "}
				<Link href="/terms" className="text-main-green hover:underline">
					Terms of Service
				</Link>{" "}
				and{" "}
				<Link href="/privacy" className="text-main-green hover:underline">
					Privacy Policy
				</Link>
				.
			</p>
		</div>
	);
}
