import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MainButton } from "./MainButton";

type TCustomDialog = {
	children: React.ReactNode;
	trigger: string;
	title: string;
	dialogContentClassName?: string;
	disabled?: boolean;
	open?: boolean;
	setOpen?: (open: boolean) => void;
	isMainButton?: boolean;
};

export const CustomDialog = ({
	children,
	trigger,
	title,
	className,
	dialogContentClassName,
	disabled = false,
	open,
	setOpen,
	isMainButton = false,
}: TCustomDialog & React.ComponentProps<"button">) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className="capitalize">
				{isMainButton ? (
					<MainButton disabled={disabled} className={cn(className)}>
						{trigger}
					</MainButton>
				) : (
					<Button
						disabled={disabled}
						className={cn(className)}
						variant="outline"
					>
						{trigger}
					</Button>
				)}
			</DialogTrigger>
			<DialogContent
				className={cn(
					"sm:min-w-[425px] dark:bg-main-black",
					dialogContentClassName
				)}
			>
				<DialogHeader>
					<DialogTitle className="capitalize">{trigger}</DialogTitle>
					<DialogDescription>
						Make changes to your <span className="capitalize">{title}</span>{" "}
						here. Click <span className="capitalize">{trigger}</span> when
						you&apos;re done.
					</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};
