"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  onSearch: (filters: any) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [filters, setFilters] = useState({
    type: "any",
    property: "any",
    minPrice: "0",
    maxPrice: "no-limit",
    bedrooms: "any",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 mb-8 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-800">Type</label>
          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 bg-white/80 hover:bg-white transition-colors">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-800">
            Property
          </label>
          <Select
            value={filters.property}
            onValueChange={(value) => handleFilterChange("property", value)}
          >
            <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 bg-white/80 hover:bg-white transition-colors">
              <SelectValue placeholder="Any property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Min Price Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-800">
            Min Price
          </label>
          <Select
            value={filters.minPrice}
            onValueChange={(value) => handleFilterChange("minPrice", value)}
          >
            <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 bg-white/80 hover:bg-white transition-colors">
              <SelectValue placeholder="$0" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">$0</SelectItem>
              <SelectItem value="$500">$500</SelectItem>
              <SelectItem value="$1000">$1000</SelectItem>
              <SelectItem value="$1500">$1500</SelectItem>
              <SelectItem value="$2000">$2000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Max Price Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-800">
            Max Price
          </label>
          <Select
            value={filters.maxPrice}
            onValueChange={(value) => handleFilterChange("maxPrice", value)}
          >
            <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 bg-white/80 hover:bg-white transition-colors">
              <SelectValue placeholder="No limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no-limit">No limit</SelectItem>
              <SelectItem value="$1000">$1000</SelectItem>
              <SelectItem value="$1500">$1500</SelectItem>
              <SelectItem value="$2000">$2000</SelectItem>
              <SelectItem value="$3000">$3000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-800">
            Bedrooms
          </label>
          <Select
            value={filters.bedrooms}
            onValueChange={(value) => handleFilterChange("bedrooms", value)}
          >
            <SelectTrigger className="w-full border-gray-300 focus:border-blue-500 bg-white/80 hover:bg-white transition-colors">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="3+">3+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
