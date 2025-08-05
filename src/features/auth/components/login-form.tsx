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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { LoginForm, onLogin, isLoginPending } = useLogin();

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={cn(" flex flex-col gap-6", className)} {...props}>
			<Card className="bg-[#171717] text-white">
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your Account details below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...LoginForm}>
						<form onSubmit={LoginForm.handleSubmit(onLogin)}>
							<div className="flex flex-col gap-6">
								<FormField
									control={LoginForm.control}
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
									control={LoginForm.control}
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

								<div className="flex flex-col gap-3">
									<MainButton
										type="submit"
										className="w-full"
										disabled={isLoginPending || !LoginForm.formState.isValid}
										loading={isLoginPending}
										loadingText="Logging in"
									>
										Login
									</MainButton>
									<div className="flex items-center">
										<MainButton className="hover:bg-black hover:text-white w-full bg-white text-black">
											Login with Google
										</MainButton>
									</div>
								</div>
							</div>
							<div className="mt-4 text-center text-sm">
								Don&apos;t have an account?{" "}
								<Link href="/signup" className="underline underline-offset-4">
									Sign Up
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
