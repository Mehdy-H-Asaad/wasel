import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

type TMainButton = {
	children: ReactNode;
	disabled?: boolean;
	loading?: boolean;
	loadingText?: string;
};

export const MainButton = ({
	children,
	className,
	disabled,
	loading,
	loadingText,
	...props
}: TMainButton & React.ComponentPropsWithoutRef<"button">) => {
	return (
		<Button
			className={`${cn(
				"bg-main-green text-white py-1 capitalize px-4 font-bold rounded-lg w-fit cursor-pointer hover:bg-secondary-green",
				className
			)}`}
			disabled={disabled}
			{...props}
		>
			{loading ? (
				<>
					<Loader2 className="w-4 h-4 animate-spin" />
					{loadingText}
				</>
			) : (
				<>{children}</>
			)}
		</Button>
	);
};
