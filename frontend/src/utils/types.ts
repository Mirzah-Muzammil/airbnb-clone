import type { Dispatch, SetStateAction } from "react";
import type { LucideIcon } from "lucide-react";


export type Property = {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  images: string[];
  description: string;
};



export type FilterPanelProps = {
  onSearch: (filters: {
    query: string;
    minPrice: string;
    maxPrice: string;
    minRating: string;
  }) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
};

export type ActiveMenu = "where" | "when" | "who" | null;

export type Destination = {
  icon: LucideIcon;
  text: string;
  subtext: string;
  isBlue?: boolean;
};

export type GuestCounts = {
  adults: number;
  children: number;
  infants: number;
  pets: number;
};

export type GuestType = {
  id: "adults" | "children" | "infants" | "pets";
  title: string;
  subtitle: string;
  value: number;
  setter: Dispatch<SetStateAction<number>>;
  underline?: boolean;
};
