"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";

export type FilterType = "all" | "applied" | "interviewing" | "offer" | "accepted" | "rejected";
export type SortType = "latest" | "earliest";

interface ApplicationFiltersProps {
  currentFilter: FilterType;
  currentSort: SortType;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
}

export function ApplicationFilters({
  currentFilter,
  currentSort,
  onFilterChange,
  onSortChange,
}: ApplicationFiltersProps) {
  const filterOptions: { value: FilterType; label: string }[] = [
    { value: "all", label: "All Applications" },
    { value: "applied", label: "Applied" },
    { value: "interviewing", label: "Interviewing" },
    { value: "offer", label: "Offer" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
  ];

  const sortOptions: { value: SortType; label: string }[] = [
    { value: "latest", label: "Latest First" },
    { value: "earliest", label: "Earliest First" },
  ];

  const getCurrentFilterLabel = () => {
    return filterOptions.find((opt) => opt.value === currentFilter)?.label || "All Applications";
  };

  const getCurrentSortLabel = () => {
    return sortOptions.find((opt) => opt.value === currentSort)?.label || "Latest First";
  };

  return (
    <div className="flex gap-2">
      {/* Status Filter Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-border-gray rounded-[3px] bg-off-white text-black text-[14px] font-sans tracking-tighter">
            Status: {getCurrentFilterLabel()}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filterOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className="flex items-center justify-between cursor-pointer"
            >
              {option.label}
              {currentFilter === option.value && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-border-gray rounded-[3px] bg-off-white text-black text-[14px] font-sans tracking-tighter">
            Sort: {getCurrentSortLabel()}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Sort by Date</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className="flex items-center justify-between cursor-pointer"
            >
              {option.label}
              {currentSort === option.value && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}