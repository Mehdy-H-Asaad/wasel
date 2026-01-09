"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { X, Filter, ChevronDown } from "lucide-react";
import { TClientFilters } from "../../hooks/useGetClients";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/shared/hooks/use-debounce";

interface ClientsFiltersProps {
  filters: TClientFilters;
  onFiltersChange: (filters: TClientFilters) => void;
  onClearFilters: () => void;
}

export const ClientsFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: ClientsFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [vatNumber, setVatNumber] = useState(filters.vat_number || "");
  const [phone, setPhone] = useState(filters.phone || "");
  const clearAllFilters = () => {
    onClearFilters();
    setVatNumber("");
    setPhone("");
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== undefined
  ).length;

  const handleSearch = useDebounce({
    callback: (value: string, key: string) => {
      onFiltersChange({ [key]: value });
    },
    delay: 500,
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
              <div className="flex items-center gap-2">
                <Input
                  onChange={(e) => {
                    setVatNumber(e.target.value);
                    handleSearch(e.target.value, "vat_number");
                  }}
                  placeholder="VAT Number"
                  value={vatNumber}
                />

                <Input
                  onChange={(e) => {
                    setPhone(e.target.value);
                    handleSearch(e.target.value, "phone");
                  }}
                  placeholder="Phone Number"
                  value={phone}
                />
              </div>
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
