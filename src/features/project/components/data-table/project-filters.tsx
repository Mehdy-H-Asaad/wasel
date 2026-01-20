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
import { AsyncSelect } from "@/components/common/select/async-select";
import { useGetClients } from "@/features/clients/hooks/useGetClients";
import { PROJECT_STATUSES } from "../../constants/project.constants";

export type TProjectFilters = {
  name?: string;
  status?: string;
  customer_id?: string;
};

interface ProjectFiltersProps {
  filters: TProjectFilters;
  onFiltersChange: (filters: TProjectFilters) => void;
  onClearFilters: () => void;
}

export const ProjectFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: ProjectFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clientSearch, setClientSearch] = useState<string>("");

  const clearAllFilters = () => {
    onClearFilters();
    setClientSearch("");
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== undefined && value !== ""
  ).length;

  const { clients, isLoadingClients } = useGetClients({
    filters: { registration_name: clientSearch, limit: 30, page: 1 },
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
                className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""
                  }`}
              />
            </Button>
          </CollapsibleTrigger>

          {/* Collapsible Filter Content with Animation */}
          <CollapsibleContent className="w-full overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <div className="flex items-center gap-2 flex-wrap pt-3 pb-1 border-t border-border/50 mt-2">
              {/* Client Filter */}
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
                  value={filters.customer_id ? Number(filters.customer_id) : null}
                />
              </div>

              {/* Status Filter */}
              <Select
                value={filters.status || "all"}
                onValueChange={(value) =>
                  onFiltersChange({
                    status: value === "all" ? "" : value,
                  })
                }
              >
                <SelectTrigger className="w- h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {PROJECT_STATUSES.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
