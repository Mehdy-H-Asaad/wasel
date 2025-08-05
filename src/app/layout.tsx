import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "@/shared/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Online Faotarah",
	description: "Mange all of your invoices on faotarah",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${montserrat.className} antialiased `}>
				<Providers>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<Toaster />
					</ThemeProvider>
				</Providers>
			</body>
		</html>
	);
}
