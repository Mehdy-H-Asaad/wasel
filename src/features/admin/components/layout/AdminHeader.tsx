import { FiLogOut } from "react-icons/fi";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { AdminNavLink } from "../AdminNavLink";
import Image from "next/image";
import Logo from "../../../../../public/assets/imgs/F.svg";
export const AdminHeader = () => {
	return (
		<nav className="bg-white dark:bg-main-black z-20 dark:text-white h-24 flex items-center sticky top-0">
			<div className="container">
				<div className="flex items-center w-full justify-between">
					{/* <div className="font-bold text-2xl">FAOTARAH</div> */}
					<Image src={Logo} alt="LOGO" />
					<AdminNavLink />
					<div className="flex items-center gap-6">
						<DropdownMenu>
							<DropdownMenuTrigger className="bg-white cursor-pointer hover:bg-main-green hover:text-white duration-200 rounded-lg size-9 text-sm text-black font-bold flex items-center justify-center">
								MA
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
								align="end"
								sideOffset={4}
							>
								<DropdownMenuLabel className="p-0 font-normal">
									<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-medium">Mehdy Asaad</span>
											<span className="text-muted-foreground truncate text-xs">
												mehdyasaad.sy.2003@gmail.com
											</span>
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<FiLogOut />
										Logout
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
						<ThemeToggle />
					</div>
				</div>
			</div>
		</nav>
	);
};
