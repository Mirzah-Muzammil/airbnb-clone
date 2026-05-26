import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import type { Property } from "../utils/types";

type PropertyCardProps = {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const PropertyCard = ({
  property,
  isFavorite,
  onToggleFavorite,
}: PropertyCardProps) => (
  <Link
    to={`/property/${property.id}`}
    className="group flex h-full flex-col cursor-pointer"
  >
    <div className="relative aspect-[20/19] w-full overflow-hidden rounded-[20px]">
      <img
        src={property.images[0]}
        alt={property.title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* Badges */}
      <div className="absolute left-4 top-4 rounded-full bg-white px-2 py-1.5 text-[10px] font-semibold text-gray-900 shadow-md">
        Guest favourite
      </div>

      <button
        type="button"
        className="absolute right-4 top-4 group/btn"
        aria-pressed={isFavorite}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onToggleFavorite();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          className={`block h-7 w-7 transition-transform active:scale-95 ${
            isFavorite
              ? "fill-[#FF385C] stroke-white stroke-2"
              : "fill-black/50 stroke-white stroke-[2.5px] hover:stroke-white group-hover/btn:scale-110"
          }`}
        >
          <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
        </svg>
      </button>
    </div>

    {/* Content */}
    <div className="mt-3 flex flex-col gap-0.5 px-0.5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="truncate font-semibold text-gray-900 text-sm">
          {property.title}
        </h3>
      </div>
      <p className="text-gray-600 text-sm">
        {formatCurrency(property.price)} for 2 nights{" "}
        <span className="mx-1">•</span>{" "}
        <span className="font-semibold">★ {property.rating.toFixed(2)}</span>
      </p>
    </div>
  </Link>
);

export default PropertyCard;
