"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const topProducts = [
	{
		id: 1,
		name: "Premium Consulting Package",
		sales: 145,
		revenue: 72500,
		growth: "+23%",
	},
	{
		id: 2,
		name: "Standard Service Bundle",
		sales: 98,
		revenue: 49000,
		growth: "+18%",
	},
	{
		id: 3,
		name: "Enterprise Solution",
		sales: 67,
		revenue: 134000,
		growth: "+45%",
	},
	{
		id: 4,
		name: "Basic Package",
		sales: 234,
		revenue: 35100,
		growth: "+12%",
	},
];

export function TopProductsCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					{/* <IoTrophyOutline className="text-yellow-500 text-xl" /> */}
					Top Products
				</CardTitle>
				<CardDescription>Best performing products this month</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{topProducts.map((product, index) => (
						<div
							key={product.id}
							className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
						>
							<div className="flex items-center justify-center w-8 h-8 rounded-full bg-main-green text-white font-bold text-sm shrink-0">
								{index + 1}
							</div>
							<div className="flex-1 min-w-0">
								<p className="font-medium text-sm mb-1 truncate">
									{product.name}
								</p>
								<div className="flex items-center gap-3 text-xs text-muted-foreground">
									<span>{product.sales} sales</span>
									<span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
									<span className="font-semibold text-foreground">
										{product.revenue.toLocaleString()} SAR
									</span>
								</div>
							</div>
							<Badge
								variant="outline"
								className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 shrink-0"
							>
								{product.growth}
							</Badge>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
