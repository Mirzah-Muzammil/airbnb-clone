import {
  MapPin,
  Building,
  Palmtree,
  Mountain,
  Tent,
  Trees,
} from "lucide-react";
import type { Destination } from "./types";

export const DESTINATIONS: Destination[] = [
  {
    icon: MapPin,
    text: "Nearby",
    subtext: "Find what's around you",
    isBlue: true,
  },
  {
    icon: Building,
    text: "Puducherry, Puducherry",
    subtext: "Great for a weekend getaway",
  },
  {
    icon: Trees,
    text: "Bengaluru, Karnataka",
    subtext: "For sights like Lalbagh Botanical Garden",
  },
  {
    icon: Mountain,
    text: "Kodaikkanal, Tamil Nadu",
    subtext: "For nature lovers",
  },
  {
    icon: Tent,
    text: "Ooty, Puducherry",
    subtext: "Popular with travellers near you",
  },
  {
    icon: Palmtree,
    text: "North Goa, Goa",
    subtext: "Popular beach destination",
  },
];
