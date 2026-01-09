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
import { Input } from "@/components/ui/input";
import { TUserFilters } from "../../hooks/use-get-users";
import { USER_ROLES } from "../../constants/user.constants";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useDebounce } from "@/shared/hooks/use-debounce";

interface UserFiltersProps {
  filters: TUserFilters;
  onFiltersChange: (filters: TUserFilters) => void;
  onClearFilters: () => void;
}

export const UserFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: UserFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localEmail, setLocalEmail] = useState(filters.email || "");
  const [localPhone, setLocalPhone] = useState(filters.phone || "");

  const clearAllFilters = () => {
    setLocalEmail("");
    setLocalPhone("");
    onClearFilters();
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
                  value={localEmail}
                  onChange={(e) => {
                    setLocalEmail(e.target.value);
                    handleSearch("email", e.target.value);
                  }}
                  placeholder="Email"
                />

                <Input
                  value={localPhone}
                  onChange={(e) => {
                    setLocalPhone(e.target.value);
                    handleSearch("phone", e.target.value);
                  }}
                  placeholder="Phone"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={filters.role || ""}
                  onValueChange={(value) =>
                    onFiltersChange({ role: value as USER_ROLES })
                  }
                >
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={USER_ROLES.SUPER_ADMIN}>
                      Super Admin
                    </SelectItem>
                    <SelectItem value={USER_ROLES.ADMIN}>Admin</SelectItem>
                    <SelectItem value={USER_ROLES.SALESMAN}>
                      Salesman
                    </SelectItem>
                    <SelectItem value={USER_ROLES.ACCOUNTANT}>
                      Accountant
                    </SelectItem>
                  </SelectContent>
                </Select>
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
