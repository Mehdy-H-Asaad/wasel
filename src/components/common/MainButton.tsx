import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

type TMainButtonProps = {
	children: ReactNode;
	disabled?: boolean;
	isLoading?: boolean;
	loadingText?: string;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	blueVariant?: boolean;
} & React.ComponentProps<"button">;

export const MainButton = ({
	children,
	className,
	disabled,
	isLoading,
	loadingText,
	variant = "default",
	blueVariant = false,
	...props
}: TMainButtonProps) => {
	return (
		<Button
			variant={variant}
			className={`${cn(
				"bg-main-green text-white py-1 capitalize px-4 font-bold rounded-lg w-fit cursor-pointer hover:bg-secondary-green",
				className
			)}`}
			{...props}
			disabled={disabled}
		>
			{isLoading ? (
				<div className="flex items-center gap-2">
					<Loader2 className="w-4 h-4 animate-spin" />
					{loadingText}
				</div>
			) : (
				children
			)}
		</Button>
	);
};
