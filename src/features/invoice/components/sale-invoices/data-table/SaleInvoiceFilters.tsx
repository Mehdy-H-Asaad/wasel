"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { X, Filter, ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import {
  VAT_DOCUMENTS,
  PAYMENTS_TYPES,
  TAX_CATEGORIES,
} from "@/features/invoice/constants/invoice.constants";
import { TInvoiceFilters } from "@/features/invoice/hooks/sale-invoice/useGetSalenvoices";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "date-fns";
import { AsyncSelect } from "@/components/common/select/async-select";
import { useGetClients } from "@/features/clients/hooks/useGetClients";

interface SaleInvoiceFiltersProps {
  filters: TInvoiceFilters;
  onFiltersChange: (filters: TInvoiceFilters) => void;
  onClearFilters: () => void;
}

export const SaleInvoiceFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: SaleInvoiceFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clientSearch, setClientSearch] = useState<string>("");

  const clearAllFilters = () => {
    onClearFilters();
    setClientSearch("");
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== undefined
  ).length;

  const { clients, isLoadingClients } = useGetClients({
    limit: 20,
    page: 1,
    filters: { registration_name: clientSearch },
  });

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Filter Button */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 gap-2 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent hover:border-primary/50 transition-all duration-200"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 h-5 min-w-5 flex items-center justify-center rounded-full px-1.5 text-xs"
                >
                  {activeFiltersCount}
                </Badge>
              )}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isOpen ? "transform rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>

          {/* Collapsible Filter Content with Animation */}
          <CollapsibleContent className="w-full overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <div className="flex items-center gap-2 flex-wrap pt-3 pb-1 border-t border-border/50 mt-2">
              <div>
                <AsyncSelect
                  placeholder="Client"
                  options={
                    clients?.map((client) => ({
                      label: client.registration_name,
                      value: client.id,
                    })) ?? []
                  }
                  onSearch={setClientSearch}
                  isLoading={isLoadingClients}
                  onChange={(value) =>
                    onFiltersChange({ customer_id: value?.toString() || "" })
                  }
                  value={
                    filters.customer_id ? Number(filters.customer_id) : null
                  }
                />
              </div>

              {/* Invoice Type Code Filter */}
              <Select
                value={filters.invoice_type_code || "all"}
                onValueChange={(value) =>
                  onFiltersChange({
                    invoice_type_code:
                      value as TInvoiceFilters["invoice_type_code"],
                  })
                }
              >
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Invoice Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Invoice Types</SelectItem>
                  {VAT_DOCUMENTS.map((doc) => (
                    <SelectItem key={doc.value} value={doc.value.toString()}>
                      {doc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Payment Type Filter */}
              <Select
                value={filters.payment_means_code || "all"}
                onValueChange={(value) =>
                  onFiltersChange({
                    payment_means_code:
                      value as TInvoiceFilters["payment_means_code"],
                  })
                }
              >
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Payment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payment Types</SelectItem>
                  {PAYMENTS_TYPES.map((payment) => (
                    <SelectItem
                      key={payment.value}
                      value={payment.value.toString()}
                    >
                      {payment.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Classified Tax Category Filter */}

              <Select
                value={filters.classified_tax_category || "all"}
                onValueChange={(value) =>
                  onFiltersChange({
                    classified_tax_category:
                      value as TInvoiceFilters["classified_tax_category"],
                  })
                }
              >
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Classified Tax Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tax Categories</SelectItem>
                  {TAX_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Issue Date Range Filter */}

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className=" h-9">
                    <CalendarIcon className="h-4 w-4" />
                    {filters.issue_date_range_from ? (
                      <span>
                        {formatDate(
                          new Date(filters.issue_date_range_from),
                          "yyyy-MM-dd"
                        )}
                      </span>
                    ) : (
                      <span>Issue Date Range From</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={
                      filters.issue_date_range_from
                        ? new Date(
                            formatDate(
                              filters.issue_date_range_from,
                              "yyyy-MM-dd"
                            )
                          )
                        : undefined
                    }
                    onSelect={(date) => {
                      onFiltersChange({
                        issue_date_range_from: date
                          ? formatDate(date, "yyyy-MM-dd")
                          : "",
                      });
                    }}
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className=" h-9">
                    <CalendarIcon className="h-4 w-4" />
                    {filters.issue_date_range_to ? (
                      <span>
                        {formatDate(
                          new Date(filters.issue_date_range_to),
                          "yyyy-MM-dd"
                        )}
                      </span>
                    ) : (
                      <span>Issue Date Range To</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={
                      filters.issue_date_range_to
                        ? new Date(
                            formatDate(
                              filters.issue_date_range_to,
                              "yyyy-MM-dd"
                            )
                          )
                        : undefined
                    }
                    onSelect={(date) => {
                      onFiltersChange({
                        issue_date_range_to: date
                          ? formatDate(date, "yyyy-MM-dd")
                          : "",
                      });
                    }}
                  />
                </PopoverContent>
              </Popover>

              {/* Clear All Button */}

              {activeFiltersCount > 0 && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={clearAllFilters}
                  className="h-9 px-3 gap-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  <span>Clear All</span>
                </Button>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
