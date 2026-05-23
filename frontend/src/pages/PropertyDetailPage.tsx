import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../config/fetchConfig";
import { formatCurrency } from "../utils/formatCurrency";
import type { Property } from "../utils/types";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isError, setIsError] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setIsNotFound(false);
    setIsError(false);

    if (!id) {
      setIsNotFound(true);
      setIsLoading(false);
      return;
    }

    apiFetch({ path: `/api/properties/${id}` })
      .then((response) => {
        if (response.status === 404) {
          throw new Error("not-found");
        }
        if (!response.ok) {
          throw new Error("failed");
        }
        return response.json();
      })
      .then((data: Property) => {
        if (isMounted) {
          setProperty(data);
          setActiveImage(0);
        }
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }
        if (error instanceof Error && error.message === "not-found") {
          setIsNotFound(true);
        } else {
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
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 py-8 text-ink">
        <div className="mx-auto w-full max-w-5xl">
          <div className="h-96 animate-pulse rounded-3xl border border-clay/40 bg-white/70" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen px-4 py-8 text-ink">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-clay/40 bg-white/80 p-8">
          <h1 className="text-2xl font-semibold text-ink">
            Unable to load stay
          </h1>
          <p className="mt-2 text-sm text-ink/70">
            Please check the backend server and try again.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-coral"
          >
            ← Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  if (isNotFound || !property) {
    return (
      <div className="min-h-screen px-4 py-8 text-ink">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-clay/40 bg-white/80 p-8">
          <h1 className="text-2xl font-semibold text-ink">
            Property not found
          </h1>
          <p className="mt-2 text-sm text-ink/70">
            The stay you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-coral"
          >
            ← Back to Listings
          </Link>
        </div>
      </div>
    );
  }

  const activeImageUrl = property.images[activeImage] ?? property.images[0];
  const totalImages = property.images.length;

  const openLightbox = (index: number) => {
    setActiveImage(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const showNext = () => {
    setActiveImage((current) => (current + 1) % totalImages);
  };

  const showPrev = () => {
    setActiveImage((current) => (current - 1 + totalImages) % totalImages);
  };

  return (
    <div className="min-h-screen px-4 py-8 text-ink">
      <div className="px-4 md:px-8">
        <Link to="/" className="text-sm font-semibold text-coral">
          ← Back to Listings
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <button
              type="button"
              onClick={() => openLightbox(activeImage)}
              className="overflow-hidden rounded-3xl border border-clay/40 bg-white/80"
            >
              <img
                src={activeImageUrl}
                alt={property.title}
                className="h-96 w-full object-cover"
              />
            </button>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {property.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`overflow-hidden rounded-2xl border transition ${
                    activeImage === index
                      ? "border-coral"
                      : "border-clay/50 hover:border-coral/70"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${property.title} thumbnail ${index + 1}`}
                    className="h-24 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-clay/40 bg-white/80 p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-ink md:text-3xl">
              {property.title}
            </h1>
            <p className="mt-2 text-sm text-ink/70">📍 {property.location}</p>
            <p className="mt-2 text-sm font-semibold text-ink">
              ★ {property.rating}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-xl font-semibold text-ink">
                {formatCurrency(property.price)}
                <span className="text-sm font-normal text-ink/60">
                  {" "}
                  / night
                </span>
              </p>
              <button
                type="button"
                className="rounded-full bg-coral px-6 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Book Now
              </button>
            </div>

            <div className="mt-6 border-t border-clay/40 pt-4 text-sm text-ink/80">
              <p className="leading-relaxed">{property.description}</p>
            </div>
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 px-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeImageUrl}
              alt={property.title}
              className="max-h-[80vh] w-full rounded-3xl object-contain"
            />
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink"
            >
              Close
            </button>
            {totalImages > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink"
                >
                  Next
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage;
