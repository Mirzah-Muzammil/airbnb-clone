import { useEffect, useState } from "react";
import FilterPanel from "../components/FilterPanel";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import { apiFetch } from "../config/fetchConfig";
import { useDebounce } from "../hooks/useDebounce";
import type { Property } from "../utils/types";

const HomePage = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const debouncedQuery = useDebounce(query);

  const hasActiveFilters =
    query.length > 0 ||
    minPrice.length > 0 ||
    maxPrice.length > 0 ||
    minRating.length > 0;

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

  useEffect(() => {
    if (!hasActiveFilters) {
      setFilteredProperties(allProperties);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setIsError(false);

    const params = new URLSearchParams();
    if (debouncedQuery) params.set("search", debouncedQuery);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (minRating) params.set("rating", minRating);

    apiFetch({
      path: `/api/properties?${params.toString()}`,
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load properties");
        }
        return response.json();
      })
      .then((data: Property[]) => {
        setFilteredProperties(data);
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [
    allProperties,
    debouncedQuery,
    minPrice,
    maxPrice,
    minRating,
    hasActiveFilters,
  ]);

  const toggleFavorite = (id: number) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 pb-8 pt-8">
        <FilterPanel
          query={query}
          onQueryChange={setQuery}
          minPrice={minPrice}
          maxPrice={maxPrice}
          minRating={minRating}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onMinRatingChange={setMinRating}
          onClear={() => {
            setQuery("");
            setMinPrice("");
            setMaxPrice("");
            setMinRating("");
          }}
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
