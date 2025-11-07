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
import { X, Filter, ChevronDown } from "lucide-react";
import {
  VAT_DOCUMENTS,
  PAYMENTS_TYPES,
} from "@/features/invoice/constants/invoice.constants";
import { CLIENT_IDENTIFCATIONS } from "@/features/clients/constants/client.constant";

export type SaleInvoiceFilters = {
  invoice_type_code?: string;
  payment_means_code?: string;
  party_identification_scheme?: string;
};

interface SaleInvoiceFiltersProps {
  filters: SaleInvoiceFilters;
  onFiltersChange: (filters: SaleInvoiceFilters) => void;
}

export { type SaleInvoiceFilters as SaleInvoiceFiltersType };

export const SaleInvoiceFilters = ({
  filters,
  onFiltersChange,
}: SaleInvoiceFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof SaleInvoiceFilters, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value === "all" ? undefined : value,
    };
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== undefined
  ).length;

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
              {/* Invoice Type Code Filter */}
              <Select
                value={filters.invoice_type_code || "all"}
                onValueChange={(value) =>
                  updateFilter("invoice_type_code", value)
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
                  updateFilter("payment_means_code", value)
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

              {/* Client Identification Filter */}
              <Select
                value={filters.party_identification_scheme || "all"}
                onValueChange={(value) =>
                  updateFilter("party_identification_scheme", value)
                }
              >
                <SelectTrigger className="w-[200px] h-9">
                  <SelectValue placeholder="Client Identification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Identifications</SelectItem>
                  {CLIENT_IDENTIFCATIONS.map((identification) => (
                    <SelectItem
                      key={identification.value}
                      value={identification.value}
                    >
                      {identification.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear All Button */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
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

        {/* Active Filter Badges - Show individual badges when collapsed or expanded */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {filters.invoice_type_code && (
              <Badge
                variant="secondary"
                className="h-7 px-2 gap-1.5 flex items-center"
              >
                <span>
                  {
                    VAT_DOCUMENTS.find(
                      (doc) =>
                        doc.value.toString() === filters.invoice_type_code
                    )?.label
                  }
                </span>
                <button
                  onClick={() => updateFilter("invoice_type_code", "all")}
                  className="ml-1 rounded-full hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {filters.payment_means_code && (
              <Badge
                variant="secondary"
                className="h-7 px-2 gap-1.5 flex items-center"
              >
                <span>
                  {
                    PAYMENTS_TYPES.find(
                      (payment) =>
                        payment.value.toString() === filters.payment_means_code
                    )?.label
                  }
                </span>
                <button
                  onClick={() => updateFilter("payment_means_code", "all")}
                  className="ml-1 rounded-full hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {filters.party_identification_scheme && (
              <Badge
                variant="secondary"
                className="h-7 px-2 gap-1.5 flex items-center"
              >
                <span>
                  {
                    CLIENT_IDENTIFCATIONS.find(
                      (identification) =>
                        identification.value ===
                        filters.party_identification_scheme
                    )?.label
                  }
                </span>
                <button
                  onClick={() =>
                    updateFilter("party_identification_scheme", "all")
                  }
                  className="ml-1 rounded-full hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
