import { MainButton } from "@/components/common/MainButton";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type TCustomDialog = {
	children: React.ReactNode;
	trigger: string;
	title: string;
	dialogContentClassName?: string;
	disabled?: boolean;
};

export const CustomDialog = ({
	children,
	trigger,
	title,
	className,
	dialogContentClassName,
	disabled = false,
}: TCustomDialog & React.ComponentProps<"button">) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<MainButton disabled={disabled} className={cn(className)}>
					{trigger}
				</MainButton>
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
