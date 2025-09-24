"use client";
import React from "react";
import {
	Breadcrumb,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "../ui/breadcrumb";
import { usePathname } from "next/navigation";
import { formatSegment } from "@/shared/utils/format-segment";
import Link from "next/link";

export const DynamicBreadcrumb = () => {
	const pathname = usePathname();

	const buildPath = (segments: string[], index: number) => {
		return "/" + segments.slice(0, index + 1).join("/");
	};

	const segments = pathname.split("/").filter(segment => segment.length > 0);

	const filteredSegments = segments.filter(segment => segment !== "admin");

	if (filteredSegments.length === 0) {
		return null;
	}

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/admin" className="capitalize">
						Admin
					</BreadcrumbLink>
				</BreadcrumbItem>

				{filteredSegments.map((segment, index) => (
					<React.Fragment key={index}>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							{index === filteredSegments.length - 1 ? (
								<BreadcrumbPage className="capitalize">
									{formatSegment(segment)}
								</BreadcrumbPage>
							) : (
								<Link href={"/admin/" + segment} className="capitalize">
									{formatSegment(segment)}
								</Link>
							)}
						</BreadcrumbItem>
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
