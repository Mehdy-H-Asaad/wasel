import { navLinks } from "@/shared/data/navLinks";
import Link from "next/link";
import { MainButton } from "../common/MainButton";
import { ThemeToggle } from "../theme-toggle";

export const Navbar = () => {
	return (
		<nav className=" z-20 h-20 flex items-center sticky top-0 bg-gradient-to-r from-[#121212] via-[#121212] to-main-green ">
			<div className="container flex items-center justify-between">
				<div className="font-bold text-lg">WASEL</div>

				<div className="flex items-center gap-10">
					{navLinks.map(navLink => (
						<Link
							key={navLink.title}
							className="text- font-[500]"
							href={navLink.href}
						>
							{navLink.title}
						</Link>
					))}
				</div>

				<div className="flex items-center gap-4 text- font-[500]">
					<Link href="/login">
						<MainButton>Login</MainButton>
					</Link>
					<MainButton className="bg-white text-black hover:text-white">
						AR
					</MainButton>
					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
};
