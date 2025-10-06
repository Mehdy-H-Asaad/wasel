"use client";
import { Button } from "@/components/ui/button";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	SortingState,
	getSortedRowModel,
	VisibilityState,
	ColumnFiltersState,
	getFilteredRowModel,
	useReactTable,
	PaginationState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePaginationStore } from "@/shared/store/pagination.store";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { Search, ChevronLeft, ChevronRight, FileX } from "lucide-react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pagination?: PaginationState;
	isLoading?: boolean;
	pageCount?: number;
	totalCount?: number;
	searchablePlaceholder: string;
	children?: React.ReactNode;
	manualPagination?: boolean;
	setSearchableField: (filter: string) => void;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	pageCount,
	isLoading,
	searchablePlaceholder,
	children,
	manualPagination = true,
	setSearchableField,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const { pagination, setPagination } = usePaginationStore();

	// Create a debounced search function
	const debouncedSearch = useDebounce({
		callback: setSearchableField,
		delay: 500,
	});

	const table = useReactTable({
		data,
		columns,
		...(manualPagination && {
			pageCount,
			manualPagination: true,
			onPaginationChange: updater => {
				setPagination(
					typeof updater === "function" ? updater(pagination) : updater
				);
			},
		}),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			...(manualPagination && { pagination }),
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		onRowSelectionChange: setRowSelection,
	});

	return (
		<div className="w-full space-y-4">
			{/* Header Section */}
			<div className="flex items-center justify-between gap-4">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder={searchablePlaceholder}
						onChange={e => {
							debouncedSearch(e.target.value);
						}}
						className="pl-9 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-200"
					/>
				</div>
				{children}
			</div>

			{/* Table Section */}
			{isLoading ? (
				<div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
					<div className="p-8 space-y-4">
						<Skeleton className="h-12 w-full rounded-lg" />
						<Skeleton className="h-16 w-full rounded-lg" />
						<Skeleton className="h-16 w-full rounded-lg" />
						<Skeleton className="h-16 w-full rounded-lg" />
						<Skeleton className="h-16 w-full rounded-lg" />
					</div>
				</div>
			) : (
				<div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
					<div className="overflow-x-auto">
						<Table>
							<TableHeader className="bg-muted/50 backdrop-blur-sm sticky top-0 z-10">
								{table.getHeaderGroups().map(headerGroup => (
									<TableRow
										className="border-b border-border/50 hover:bg-transparent"
										key={headerGroup.id}
									>
										{headerGroup.headers.map(header => (
											<TableHead
												className="rtl:text-right font-semibold text-foreground/90 py-4 px-4"
												key={header.id}
											>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
													  )}
											</TableHead>
										))}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row, index) => (
										<TableRow
											className="border-b border-border/30 hover:bg-muted/30 transition-colors duration-150"
											key={row.id}
											data-state={row.getIsSelected() && "selected"}
											style={{
												animationDelay: `${index * 0.05}s`,
												animation: "fadeIn 0.3s ease-in-out forwards",
												opacity: 0,
											}}
										>
											{row.getVisibleCells().map(cell => (
												<TableCell className="py-4 px-4" key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow className="hover:bg-transparent">
										<TableCell
											colSpan={columns.length}
											className="h-64 text-center"
										>
											<div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
												<FileX className="h-12 w-12 opacity-40" />
												<p className="text-lg font-medium">No results found</p>
												<p className="text-sm">
													Try adjusting your search criteria
												</p>
											</div>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>
			)}

			{/* Pagination Section */}
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
				<div className="text-sm text-muted-foreground">
					Showing{" "}
					<span className="font-medium text-foreground">
						{table.getRowModel().rows.length}
					</span>{" "}
					of{" "}
					<span className="font-medium text-foreground">
						{table.getFilteredRowModel().rows.length}
					</span>{" "}
					results
				</div>

				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className="h-9 px-3 gap-1 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent hover:border-primary/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="hidden sm:inline">Previous</span>
					</Button>

					<div className="flex items-center gap-1">
						<div className="flex h-9 min-w-9 items-center justify-center rounded-md border border-border/50 bg-primary/10 px-3 text-sm font-medium text-primary">
							{pagination.pageIndex + 1}
						</div>
						<span className="text-sm text-muted-foreground px-1">of</span>
						<div className="flex h-9 min-w-9 items-center justify-center rounded-md border border-border/50 bg-background/50 px-3 text-sm">
							{pageCount || 1}
						</div>
					</div>

					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className="h-9 px-3 gap-1 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent hover:border-primary/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<span className="hidden sm:inline">Next</span>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
