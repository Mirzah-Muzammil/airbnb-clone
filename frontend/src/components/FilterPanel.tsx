import { useState } from "react";

type FilterPanelProps = {
  onSearch: (filters: {
    query: string;
    minPrice: string;
    maxPrice: string;
    minRating: string;
  }) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
};

const FilterPanel = ({ onSearch, onClear, hasActiveFilters }: FilterPanelProps) => {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");

  const handleSearch = () => {
    onSearch({ query, minPrice, maxPrice, minRating });
  };

  const handleClear = () => {
    setQuery("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    onClear();
  };

  return (
    <div className="mx-auto w-full max-w-[850px] mb-10">
      <div className="flex flex-col md:flex-row w-full items-center rounded-[2rem] md:rounded-full border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden md:overflow-visible">
        <div className="flex w-full md:flex-1 flex-col md:rounded-full py-3.5 px-6 md:pl-8 md:pr-4 hover:bg-gray-100 transition-colors cursor-pointer">
          <span className="text-xs font-extrabold text-gray-800">Where</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search destinations"
            className="w-full bg-transparent text-sm text-gray-600 focus:outline-none placeholder:text-gray-400 font-medium truncate"
          />
        </div>

        <div className="h-[1px] w-full md:h-8 md:w-[1px] bg-gray-200 shrink-0" />

        <div className="flex w-full md:flex-1 flex-col md:rounded-full py-3.5 px-6 hover:bg-gray-100 transition-colors cursor-pointer relative group">
          <span className="text-xs font-extrabold text-gray-800">Price</span>
          <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min"
              className="w-16 bg-transparent focus:outline-none placeholder:text-gray-400"
            />
            <span>-</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max"
              className="w-16 bg-transparent focus:outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="h-[1px] w-full md:h-8 md:w-[1px] bg-gray-200 shrink-0" />

        <div className="flex w-full md:flex-1 items-center justify-between md:rounded-full py-2 px-6 pr-2 md:pl-6 md:pr-2 hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="flex flex-col flex-1 pr-2">
            <span className="text-xs font-extrabold text-gray-800">Rating</span>
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-gray-600 focus:outline-none appearance-none cursor-pointer"
            >
              <option value="">Any rating</option>
              <option value="3">3+ Stars</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={handleClear}
                className="text-xs font-semibold text-gray-500 hover:text-gray-800 underline"
              >
                Clear
              </button>
            )}
            <button
              onClick={handleSearch}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF385C] text-white hover:bg-[#D70466] transition-colors shadow-sm md:ml-2 my-1 md:my-0 shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
