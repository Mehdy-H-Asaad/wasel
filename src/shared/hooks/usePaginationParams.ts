import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PaginationState } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";

type UsePaginationParamsOptions = {
  defaultPageSize?: number;
};

export const usePaginationParams = (
  options: UsePaginationParamsOptions = {}
) => {
  const { defaultPageSize = 10 } = options;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse and validate pagination from URL
  const pagination: PaginationState = useMemo(() => {
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(
      1,
      Math.min(100, parseInt(searchParams.get("limit") || String(defaultPageSize), 10))
    );

    return {
      pageIndex: page - 1, // Convert to 0-based index
      pageSize: limit,
    };
  }, [searchParams, defaultPageSize]);

  // Update pagination in URL
  const setPagination = useCallback(
    (updater: PaginationState | ((old: PaginationState) => PaginationState)) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;

      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(newPagination.pageIndex + 1)); // Convert to 1-based
      params.set("limit", String(newPagination.pageSize));

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pagination, pathname, router, searchParams]
  );

  // Reset to first page (useful when filters change)
  const resetToFirstPage = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  return {
    pagination,
    setPagination,
    resetToFirstPage,
    page: pagination.pageIndex + 1, // 1-based for display
    limit: pagination.pageSize,
  };
};

