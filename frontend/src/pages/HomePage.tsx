import { useEffect, useState } from "react";
import FilterPanel from "../components/FilterPanel";
import PropertyCard from "../components/PropertyCard";
import { apiFetch } from "../config/fetchConfig";
import type { Property } from "../utils/types";

const HomePage = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setIsError(false);

    apiFetch({ path: "/api/properties" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load properties");
        }
        return response.json();
      })
      .then((data: Property[]) => {
        if (isMounted) {
          setAllProperties(data);
          setFilteredProperties(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsError(true);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearch = ({
    query,
    minPrice,
    maxPrice,
    minRating,
  }: {
    query: string;
    minPrice: string;
    maxPrice: string;
    minRating: string;
  }) => {
    const isActive =
      query.length > 0 ||
      minPrice.length > 0 ||
      maxPrice.length > 0 ||
      minRating.length > 0;

    if (!isActive) {
      setHasActiveFilters(false);
      setFilteredProperties(allProperties);
      return;
    }

    setHasActiveFilters(true);
    setIsLoading(true);
    setIsError(false);

    const params = new URLSearchParams();
    if (query) params.set("search", query);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (minRating) params.set("rating", minRating);

    apiFetch({ path: `/api/properties?${params.toString()}` })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load properties");
        }
        return response.json();
      })
      .then((data: Property[]) => {
        setFilteredProperties(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClear = () => {
    setHasActiveFilters(false);
    setFilteredProperties(allProperties);
  };

  const toggleFavorite = (id: number) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-7xl px-6 pb-8 pt-8">
        <FilterPanel
          onSearch={handleSearch}
          onClear={handleClear}
          hasActiveFilters={hasActiveFilters}
        />

        <div className="flex flex-col">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4 text-sm text-ink/70">
            <span>
              Showing {filteredProperties.length} of {allProperties.length}{" "}
              properties
            </span>
          </div>

          {isLoading && (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={`loading-${index}`}
                  className="aspect-[4/3] w-full animate-pulse rounded-[20px] border border-clay/40 bg-white/70"
                />
              ))}
            </div>
          )}

          {isError && (
            <div className="rounded-2xl border border-clay/40 bg-white/80 px-6 py-8 text-ink">
              <p className="text-base font-semibold">Unable to load stays.</p>
              <p className="mt-2 text-sm text-ink/70">
                Please check the backend server and try refreshing the page.
              </p>
            </div>
          )}

          {!isLoading && !isError && filteredProperties.length === 0 && (
            <div className="rounded-2xl border border-clay/40 bg-white/80 px-6 py-8 text-ink">
              <p className="text-base font-semibold">No results found.</p>
              <p className="mt-2 text-sm text-ink/70">
                Try adjusting your search or filters to see more stays.
              </p>
            </div>
          )}

          {!isLoading && !isError && filteredProperties.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favoriteIds.includes(property.id)}
                  onToggleFavorite={() => toggleFavorite(property.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
