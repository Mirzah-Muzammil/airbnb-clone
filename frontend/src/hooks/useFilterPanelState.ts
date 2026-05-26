import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { ActiveMenu, FilterPanelProps, GuestCounts, GuestType } from "../utils/types";
import { DESTINATIONS } from "../utils/constants";


type UseFilterPanelStateOptions = {
  onSearch: FilterPanelProps["onSearch"];
  onClear: FilterPanelProps["onClear"];
};

export const useFilterPanelState = ({
  onSearch,
  onClear,
}: UseFilterPanelStateOptions) => {
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [menuDirection, setMenuDirection] = useState(0);
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  const guestCounts: GuestCounts = {
    adults,
    children,
    infants,
    pets,
  };

  const guestTypes = useMemo<GuestType[]>(
    () => [
      {
        id: "adults",
        title: "Adults",
        subtitle: "Ages 13 or above",
        value: adults,
        setter: setAdults,
      },
      {
        id: "children",
        title: "Children",
        subtitle: "Ages 2-12",
        value: children,
        setter: setChildren,
      },
      {
        id: "infants",
        title: "Infants",
        subtitle: "Under 2",
        value: infants,
        setter: setInfants,
      },
      {
        id: "pets",
        title: "Pets",
        subtitle: "Bringing a service animal?",
        value: pets,
        setter: setPets,
        underline: true,
      },
    ],
    [adults, children, infants, pets],
  );

  const menuOrder: ActiveMenu[] = ["where", "when", "who"];
  const getMenuIndex = (menu: ActiveMenu) =>
    menu ? menuOrder.indexOf(menu) : -1;

  const handleMenuChange = (next: ActiveMenu) => {
    setActiveMenu((prev) => {
      const prevIndex = getMenuIndex(prev);
      const nextIndex = getMenuIndex(next);
      if (prevIndex === -1 || nextIndex === -1) {
        setMenuDirection(0);
      } else {
        setMenuDirection(nextIndex - prevIndex);
      }
      return next;
    });
  };

  const handleSearch = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onSearch({ query, minPrice: "", maxPrice: "", minRating: "" });
    setActiveMenu(null);
  };

  const handleMobileDayClick = (day: Date) => {
    setDateRange((prev) => {
      if (!prev?.from || prev.to) {
        return { from: day, to: undefined };
      }
      if (day < prev.from) {
        return { from: day, to: prev.from };
      }
      return { from: prev.from, to: day };
    });
  };

  const clearAll = () => {
    setQuery("");
    setDateRange(undefined);
    setAdults(0);
    setChildren(0);
    setInfants(0);
    setPets(0);
  };

  const clearDates = () => {
    setDateRange(undefined);
    onClear();
    setActiveMenu(null);
  };

  const handleMobileNext = () => {
    if (activeMenu === "where") {
      setActiveMenu("when");
      return;
    }
    if (activeMenu === "when") {
      setActiveMenu("who");
      return;
    }
    handleSearch();
  };

  return {
    activeMenu,
    setActiveMenu,
    menuDirection,
    query,
    setQuery,
    dateRange,
    setDateRange,
    guestCounts,
    guestTypes,
    destinations: DESTINATIONS,
    handleMenuChange,
    handleSearch,
    handleMobileDayClick,
    clearAll,
    clearDates,
    handleMobileNext,
  };
};
