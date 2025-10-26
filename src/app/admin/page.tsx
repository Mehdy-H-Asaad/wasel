import { SalesChart } from "@/features/admin/components/SalesChart";
import { ChartBarDefault } from "@/features/admin/components/chart-bar";
import { ChartBarHorizontal } from "@/features/admin/components/chart-bar-horizontal";
import { UpgradePlanCard } from "@/features/admin/components/UpgradePlanCard";
import { TopProductsCard } from "@/features/admin/components/TopProductsCard";
import React from "react";
import {
	IoTrendingUpOutline,
	IoWalletOutline,
	IoPeopleOutline,
	IoDocumentTextOutline,
} from "react-icons/io5";
import { Card, CardContent } from "@/components/ui/card";

const statsData = [
	{
		title: "Total Revenue",
		value: "$124,350.00",
		change: "+12.5%",
		icon: IoWalletOutline,
		color: "text-green-600",
		bgColor: "bg-green-50 dark:bg-green-950/30",
	},
	{
		title: "Total Clients",
		value: "2,847",
		change: "+8.2%",
		icon: IoPeopleOutline,
		color: "text-blue-600",
		bgColor: "bg-blue-50 dark:bg-blue-950/30",
	},
	{
		title: "Invoices Issued",
		value: "1,256",
		change: "+23.1%",
		icon: IoDocumentTextOutline,
		color: "text-purple-600",
		bgColor: "bg-purple-50 dark:bg-purple-950/30",
	},
	{
		title: "Growth Rate",
		value: "18.7%",
		change: "+4.3%",
		icon: IoTrendingUpOutline,
		color: "text-orange-600",
		bgColor: "bg-orange-50 dark:bg-orange-950/30",
	},
];

const AnalyticsPage = () => {
	return (
		<div className="flex flex-col gap-8">
			{/* Stats Overview */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{statsData.map((stat, index) => {
					const Icon = stat.icon;
					return (
						<Card key={index} className="hover:shadow-md transition-shadow">
							<CardContent className="">
								<div className="flex items-start justify-between mb-4">
									<div className={` rounded-lg text-light-green `}>
										<Icon className="text-3xl" />
									</div>
									<span className="text-xs font-semibold text-light-green bg-light-green/20 px-2 py-1 rounded-full">
										{stat.change}
									</span>
								</div>
								<div>
									<p className="text-sm text-muted-foreground ">{stat.title}</p>
									<p className="text-2xl font-bold">{stat.value}</p>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Main Chart */}

			{/* Second Row - Charts Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<ChartBarDefault />
				<ChartBarHorizontal />
				<TopProductsCard />
				{/* <UpgradePlanCard /> */}
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
					<SalesChart />
				</div>
				<div className="lg:col-span-1">
					<UpgradePlanCard />
				</div>
			</div>
			{/* <SalesChart /> */}
		</div>
	);
};

export default AnalyticsPage;
