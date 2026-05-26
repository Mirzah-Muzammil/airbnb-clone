import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import type { GuestCounts } from "./types";

export const formatDateRangeLabel = (range?: DateRange) => {
  if (!range?.from) return "Add dates";
  if (!range.to) return format(range.from, "d MMM");
  const sameMonth =
    range.from.getMonth() === range.to.getMonth() &&
    range.from.getFullYear() === range.to.getFullYear();
  if (sameMonth) {
    return `${format(range.from, "d")} - ${format(range.to, "d MMM")}`;
  }
  return `${format(range.from, "d MMM")} - ${format(range.to, "d MMM")}`;
};

export const getGuestSummary = ({
  adults,
  children,
  infants,
  pets,
}: GuestCounts) => {
  const guests = adults + children;
  if (!guests && !infants && !pets) {
    return "Add guests";
  }
  return (
    `${guests} guests` +
    (infants ? `, ${infants} infants` : "") +
    (pets ? `, ${pets} pets` : "")
  );
};
