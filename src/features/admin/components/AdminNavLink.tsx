"use client";
import React from "react";
import { adminNavLinks } from "../data";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const AdminNavLink = () => {
	const pathname = usePathname();
	return (
		<div className="flex items-center justify-center gap-4">
			{adminNavLinks.map(navLink => {
				const isActive = pathname === navLink.href;
				return (
					<Link
						className={`flex items-center gap-4 py-1.5 px-4 rounded-4xl font-bold ${
							isActive ? "bg-main-green text-white" : ""
						} hover:bg-main-green hover:white-black duration-200`}
						key={`${navLink.href}`}
						href={`${navLink.href}`}
					>
						{navLink.icon}
						{navLink.title}
					</Link>
				);
			})}
		</div>
	);
};
