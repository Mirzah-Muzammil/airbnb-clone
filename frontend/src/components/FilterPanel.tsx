import { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  Building,
  Palmtree,
  Mountain,
  Tent,
  Trees,
  Minus,
  Plus,
  X,
  Home,
  Compass,
  Bell,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DayPicker,
  type DateRange,
  type DayButtonProps,
} from "react-day-picker";
import { format } from "date-fns";

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

type ActiveMenu = "where" | "when" | "who" | null;

const FilterPanel = ({
  onSearch,
  onClear,
  hasActiveFilters,
}: FilterPanelProps) => {
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [menuDirection, setMenuDirection] = useState(0);
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Who state
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If mobile view is active and we click inside the mobile overlay, don't close.
      if (
        mobileContainerRef.current &&
        mobileContainerRef.current.contains(event.target as Node)
      ) {
        return;
      }

      // If clicking inside desktop container, don't close
      if (
        containerRef.current &&
        containerRef.current.contains(event.target as Node)
      ) {
        return;
      }

      // If we clicked the Search pill itself, let the Navbar handle it without closing here.
      // Easiest is to check if it has the specific class
      if ((event.target as Element).closest(".mobile-search-pill")) {
        return;
      }

      setActiveMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Listen to open mobile search from Navbar
  useEffect(() => {
    const openMobileSearch = () => {
      setActiveMenu("where");
    };
    window.addEventListener("open-mobile-search", openMobileSearch);
    return () =>
      window.removeEventListener("open-mobile-search", openMobileSearch);
  }, []);

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

  const destinations = [
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

  const guestsTypes = [
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
  ];

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

  const menuVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      y: 12,
      x: direction * 16,
    }),
    center: { opacity: 1, y: 0, x: 0 },
    exit: (direction: number) => ({
      opacity: 0,
      y: 8,
      x: -direction * 16,
    }),
  };

  const CalendarDayButton = ({
    modifiers,
    className,
    ...buttonProps
  }: DayButtonProps) => {
    const isMuted = modifiers.outside || modifiers.disabled;
    const isRangeMiddle = modifiers.range_middle;
    const isRangeEdge = modifiers.range_start || modifiers.range_end;
    const isSelected = modifiers.selected && !isRangeMiddle;

    const buttonClassName = [
      className,
      "mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors",
      isMuted ? "text-gray-300" : "text-gray-800 hover:bg-gray-100",
      isRangeEdge || isSelected
        ? "bg-[#111111] text-white hover:bg-[#111111]"
        : "",
      isRangeMiddle ? "text-gray-900" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return <button {...buttonProps} className={buttonClassName} />;
  };

  const formatDateRangeLabel = (range?: DateRange) => {
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

  return (
    <>
      <div className="hidden md:block mx-auto w-full max-w-[850px] mb-10 pb-4 relative z-50">
        <div
          ref={containerRef}
          className={`flex w-full items-center rounded-full transition-all duration-300 relative ${
            activeMenu
              ? "bg-[#EBEBEB]"
              : "bg-white border border-gray-300 shadow-sm hover:shadow-md"
          }`}
          style={{ height: "66px" }}
        >
          {/* Where Section */}
          <div
            onClick={() => handleMenuChange("where")}
            className={`relative flex-1 flex flex-col justify-center h-full rounded-full pl-8 pr-6 cursor-pointer transition-all duration-300 pointer-events-auto ${
              activeMenu === "where" ? "" : "hover:bg-gray-100/50"
            }`}
          >
            {activeMenu === "where" && (
              <motion.div
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <div className="relative z-10 flex flex-col justify-center">
              <span className="text-xs font-bold tracking-wide text-gray-800">
                Where
              </span>
              {activeMenu === "where" ? (
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search destinations"
                  className="w-full bg-transparent text-sm text-gray-800 focus:outline-none placeholder:text-gray-500 font-medium"
                />
              ) : (
                <span
                  className={`text-sm font-medium truncate ${query ? "text-gray-800" : "text-gray-500"}`}
                >
                  {query || "Search destinations"}
                </span>
              )}
            </div>
          </div>

          {/* Separator 1 */}
          <div
            className={`w-[1px] h-8 bg-gray-300 shrink-0 transition-opacity duration-300 ${
              activeMenu === "where" || activeMenu === "when"
                ? "opacity-0"
                : "opacity-100"
            }`}
          />

          {/* When Section */}
          <div
            onClick={() => handleMenuChange("when")}
            className={`relative flex-[1.2] flex flex-col justify-center h-full rounded-full px-6 cursor-pointer transition-all duration-300 ${
              activeMenu === "when" ? "" : "hover:bg-gray-100/50"
            }`}
          >
            {activeMenu === "when" && (
              <motion.div
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <div className="relative z-10 flex flex-col justify-center">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold tracking-wide text-gray-800">
                  When
                </span>
                {(dateRange?.from || hasActiveFilters) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDateRange(undefined);
                      onClear();
                      setActiveMenu(null);
                    }}
                    className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <span
                className={`text-sm font-medium truncate ${dateRange?.from ? "text-gray-800" : "text-gray-500"}`}
              >
                {formatDateRangeLabel(dateRange)}
              </span>
            </div>
          </div>

          {/* Separator 2 */}
          <div
            className={`w-[1px] h-8 bg-gray-300 shrink-0 transition-opacity duration-300 ${
              activeMenu === "when" || activeMenu === "who"
                ? "opacity-0"
                : "opacity-100"
            }`}
          />

          {/* Who Section */}
          <div
            onClick={() => handleMenuChange("who")}
            className={`relative flex-[1.3] flex items-center justify-between h-full rounded-full pl-6 pr-2 cursor-pointer transition-all duration-300 ${
              activeMenu === "who" ? "" : "hover:bg-gray-100/50"
            }`}
          >
            {activeMenu === "who" && (
              <motion.div
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <div className="relative z-10 flex flex-col justify-center truncate pr-4">
              <span className="text-xs font-bold tracking-wide text-gray-800">
                Who
              </span>
              <span
                className={`text-sm font-medium truncate ${adults || children || infants || pets ? "text-gray-800" : "text-gray-500"}`}
              >
                {adults || children || infants || pets
                  ? `${adults + children} guests` +
                    (infants ? `, ${infants} infants` : "") +
                    (pets ? `, ${pets} pets` : "")
                  : "Add guests"}
              </span>
            </div>

            <button
              onClick={handleSearch}
              className={`relative z-10 flex items-center justify-center shrink-0 rounded-full bg-[#FF385C] hover:bg-[#D70466] text-white transition-all duration-1000 ease-in-out shadow-sm ${
                activeMenu ? "h-12 px-5 gap-2" : "h-12 w-12"
              }`}
            >
              <Search size={18} strokeWidth={3} />
              <AnimatePresence>
                {activeMenu && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="font-bold whitespace-nowrap overflow-hidden"
                  >
                    Search
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Dropdowns */}
          <AnimatePresence mode="wait" initial={false}>
            {activeMenu === "where" && (
              <motion.div
                custom={menuDirection}
                variants={menuVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-[80px] left-0 w-[420px] bg-white rounded-3xl shadow-[0_6px_20px_rgba(0,0,0,0.2)] py-6 px-6"
              >
                <h3 className="text-xs font-bold text-gray-800 mb-4 px-2">
                  Suggested destinations
                </h3>
                <div className="flex flex-col">
                  {destinations.map((dest, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-xl cursor-pointer"
                      onClick={() => {
                        setQuery(dest.text);
                        handleMenuChange("when");
                      }}
                    >
                      <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <dest.icon
                          size={24}
                          className={
                            dest.isBlue ? "text-blue-600" : "text-gray-600"
                          }
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="font-medium text-gray-800">
                          {dest.text}
                        </span>
                        <span className="text-sm text-gray-500 truncate">
                          {dest.subtext}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeMenu === "when" && (
              <motion.div
                custom={menuDirection}
                variants={menuVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-[80px] left-0 right-0 mx-auto w-full max-w-[850px] bg-white rounded-3xl shadow-[0_6px_20px_rgba(0,0,0,0.2)] p-8 flex flex-col"
              >
                <div className="flex justify-center mb-8">
                  <div className="flex bg-gray-100 rounded-full p-1">
                    <button className="px-6 py-1.5 rounded-full bg-white shadow-sm text-sm font-semibold text-gray-800">
                      Dates
                    </button>
                    <button className="px-6 py-1.5 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors">
                      Flexible
                    </button>
                  </div>
                </div>

                <div className="px-4">
                  <DayPicker
                    mode="range"
                    numberOfMonths={2}
                    navLayout="around"
                    selected={dateRange}
                    onSelect={setDateRange}
                    showOutsideDays
                    className="w-full"
                    classNames={{
                      root: "w-full",
                      months:
                        "relative flex flex-col w-full gap-8 md:flex-row md:gap-12",
                      month: "w-full",
                      month_caption:
                        "relative w-full flex items-center justify-center mb-4",
                      caption_label:
                        "text-base font-semibold text-gray-800 text-center relative z-10",
                      nav: "w-full ",
                      button_previous:
                        "h-9 w-9 rounded-full absolute -top-2 left-0 z-10 text-gray-400 hover:bg-gray-100",
                      button_next:
                        "h-9 w-9 rounded-full text-gray-800 absolute -top-2 z-10 right-0 hover:bg-gray-100",
                      weekdays: "grid grid-cols-7 text-center",
                      weekday: "text-xs font-semibold text-gray-400 py-2",
                      weeks: "flex flex-col gap-1",
                      week: "grid grid-cols-7 text-center",
                      day: "relative py-1",
                      day_button:
                        "mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                      outside: "text-gray-300",
                      disabled: "text-gray-300",
                      today: "text-gray-900",
                      range_middle: "bg-gray-100 text-gray-900 rounded-none",
                    }}
                    components={{
                      DayButton: CalendarDayButton,
                    }}
                  />
                </div>

                <div className="flex items-center gap-2 mt-4 px-4 overflow-x-auto pb-2">
                  <button className="px-4 py-2 border border-gray-800 rounded-full text-sm font-semibold text-gray-800 whitespace-nowrap bg-gray-50">
                    Exact dates
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:border-gray-800 whitespace-nowrap">
                    &plusmn; 1 day
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:border-gray-800 whitespace-nowrap">
                    &plusmn; 2 days
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:border-gray-800 whitespace-nowrap">
                    &plusmn; 3 days
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:border-gray-800 whitespace-nowrap">
                    &plusmn; 7 days
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:border-gray-800 whitespace-nowrap">
                    &plusmn; 14 days
                  </button>
                </div>
              </motion.div>
            )}

            {activeMenu === "who" && (
              <motion.div
                custom={menuDirection}
                variants={menuVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-[80px] right-0 w-[400px] bg-white rounded-3xl shadow-[0_6px_20px_rgba(0,0,0,0.2)] p-6"
              >
                <div className="flex flex-col">
                  {guestsTypes.map((type, i) => (
                    <div key={type.id}>
                      <div className="flex items-center justify-between py-5">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-800">
                            {type.title}
                          </span>
                          <span
                            className={`text-sm text-gray-500 ${type.underline ? "underline cursor-pointer" : ""}`}
                          >
                            {type.subtitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              type.setter(Math.max(0, type.value - 1));
                            }}
                            className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition-colors ${type.value === 0 ? "opacity-50 cursor-not-allowed" : "hover:border-gray-800 text-gray-500 hover:text-gray-800"}`}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-4 text-center text-gray-800 font-medium">
                            {type.value}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              type.setter(type.value + 1);
                            }}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      {i < guestsTypes.length - 1 && (
                        <div className="h-[1px] w-full bg-gray-200" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Filter UI overlay */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            ref={mobileContainerRef}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[1000] bg-[#F7F7F7] md:hidden flex flex-col pt-4 overflow-y-auto"
          >
            <div className="flex items-center justify-between px-4 mb-6 relative">
              <div className="flex items-center justify-center gap-8 mx-auto text-sm font-semibold text-gray-700">
                <button
                  type="button"
                  className="group relative flex flex-col pt-1 pb-3 items-center justify-center gap-1 text-gray-900"
                >
                  <Home className="h-6 w-6 opacity-80" />
                  <span className="text-xs">Homes</span>
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-full -translate-x-1/2 rounded-full bg-gray-900" />
                </button>
                <button
                  type="button"
                  className="group relative flex flex-col pt-1 pb-3 items-center justify-center gap-1 text-gray-500 hover:text-gray-700"
                >
                  <Compass className="h-6 w-6 opacity-70" />
                  <span className="text-xs">Experiences</span>
                </button>
                <button
                  type="button"
                  className="group relative flex flex-col pt-1 pb-3 items-center justify-center gap-1 text-gray-500 hover:text-gray-700"
                >
                  <Bell className="h-6 w-6 opacity-70" />
                  <span className="text-xs">Services</span>
                </button>
              </div>
              <button
                onClick={() => setActiveMenu(null)}
                className="absolute right-4 p-2 border border-gray-200 bg-white rounded-full flex items-center justify-center shadow-sm"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-4 flex flex-col gap-4 pb-24">
              {/* Where Card */}
              <div
                className={`bg-white max-h-[500px] rounded-3xl shadow-sm flex flex-col overflow-hidden transition-all duration-300 ${activeMenu === "where" ? "p-5 pb-2" : "p-4"}`}
              >
                {activeMenu === "where" ? (
                  <>
                    <h2 className="text-[26px] font-bold text-gray-800 mb-4 px-1">
                      Where?
                    </h2>
                    <div className="flex items-center border border-gray-400 rounded-xl p-4 mb-4 bg-white gap-3">
                      <Search size={20} className="text-gray-800 shrink-0" />
                      <input
                        type="text"
                        className="bg-transparent text-gray-800 w-full outline-none font-medium text-[15px]"
                        placeholder="Search destinations"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div className="px-1 mb-2">
                      <span className="text-sm font-semibold text-gray-800">
                        Suggested destinations
                      </span>
                    </div>
                    <div className="flex flex-col overflow-scroll">
                      {destinations.map((dest, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 hover:bg-gray-100 px-2 py-3 rounded-xl cursor-pointer"
                          onClick={() => {
                            setQuery(dest.text);
                            handleMenuChange("when");
                          }}
                        >
                          <div className="h-[48px] w-[48px] bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                            <dest.icon
                              size={22}
                              className={
                                dest.isBlue ? "text-[#3D69F2]" : "text-gray-800"
                              }
                              strokeWidth={1.5}
                            />
                          </div>
                          <div className="flex flex-col truncate">
                            <span className="font-semibold text-[15px] text-gray-800">
                              {dest.text}
                            </span>
                            <span className="text-sm text-gray-500 truncate">
                              {dest.subtext}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setActiveMenu("where")}
                  >
                    <span className="text-sm font-medium text-gray-500">
                      Where
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {query || "I'm flexible"}
                    </span>
                  </div>
                )}
              </div>

              {/* When Card */}
              <div
                className={`bg-white rounded-3xl max-h-[500px] shadow-sm flex flex-col overflow-hidden transition-all duration-300 ${activeMenu === "when" ? "p-5 pb-2" : "px-5 py-4"}`}
              >
                {activeMenu === "when" ? (
                  <>
                    <h2 className="text-[26px] font-bold text-gray-800 mb-6 px-1">
                      When?
                    </h2>
                    <div className="flex bg-gray-100 p-1 rounded-full w-full mb-6 relative">
                      <button className="flex-1 relative z-10 rounded-full bg-white shadow-sm py-1.5 text-sm font-semibold">
                        Dates
                      </button>
                      <button className="flex-1 relative z-10 rounded-full py-1.5 text-sm font-medium text-gray-800">
                        Flexible dates
                      </button>
                    </div>
                    <div className="flex justify-start overflow-scroll flex-col -mx-4 items-center pt-2">
                      <DayPicker
                        mode="range"
                        defaultMonth={new Date()}
                        selected={dateRange}
                        onDayClick={handleMobileDayClick}
                        numberOfMonths={12}
                        components={{
                          DayButton: CalendarDayButton,
                        }}
                        classNames={{
                          months: "flex flex-col gap-8 mx-auto",
                          month: "w-full mx-auto",
                          month_caption:
                            "relative flex items-center justify-center h-10 mt-2 mb-4 font-bold text-gray-800",
                          caption_label: "text-base z-10",
                          nav: "hidden",
                          month_grid: "w-full border-collapse mx-auto",
                          weekdays: "grid grid-cols-7 w-full mb-2",
                          weekday:
                            "h-10 flex flex-col justify-end text-xs font-semibold text-gray-500 pb-2",
                          week: "grid grid-cols-7 w-full mt-1",
                          day: "relative p-0 text-center focus-within:relative focus-within:z-20",
                          range_middle: "bg-black/10",
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setActiveMenu("when")}
                  >
                    <span className="text-sm font-medium text-gray-500">
                      When
                    </span>
                    <span className="text-[15px] font-semibold text-gray-800">
                      {formatDateRangeLabel(dateRange)}
                    </span>
                  </div>
                )}
              </div>

              {/* Who Card */}
              <div
                className={`bg-white rounded-3xl shadow-sm flex flex-col overflow-hidden transition-all duration-300 ${activeMenu === "who" ? "p-5 pb-2" : "px-5 py-4"}`}
              >
                {activeMenu === "who" ? (
                  <>
                    <h2 className="text-[26px] font-bold text-gray-800 mb-6 px-1">
                      Who?
                    </h2>
                    <div className="flex flex-col">
                      {guestsTypes.map((type, i) => (
                        <div
                          key={type.id}
                          className={`flex items-center justify-between py-6 ${
                            i !== guestsTypes.length - 1
                              ? "border-b border-gray-200"
                              : ""
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-800">
                              {type.title}
                            </span>
                            <span className="text-sm text-gray-500">
                              {type.subtitle}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (type.value > 0) type.setter(type.value - 1);
                              }}
                              className={`h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center ${
                                type.value === 0
                                  ? "opacity-50 cursor-not-allowed text-gray-300"
                                  : "hover:border-gray-800 text-gray-500"
                              }`}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-4 text-center font-medium text-gray-800">
                              {type.value}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                type.setter(type.value + 1);
                              }}
                              className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-800"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setActiveMenu("who")}
                  >
                    <span className="text-sm font-medium text-gray-500">
                      Who
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {adults || children || infants || pets
                        ? `${adults + children} guests` +
                          (infants ? `, ${infants} infants` : "") +
                          (pets ? `, ${pets} pets` : "")
                        : "Add guests"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Bottom Bar Navbar Replacement + Search trigger */}
            <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center pb-8 z-[1100]">
              <button
                onClick={() => {
                  setQuery("");
                  setDateRange(undefined);
                  setAdults(0);
                  setChildren(0);
                  setInfants(0);
                  setPets(0);
                }}
                className="text-[15px] font-semibold underline text-gray-800 py-1"
              >
                Clear all
              </button>
              <button
                onClick={() => {
                  if (activeMenu === "where") setActiveMenu("when");
                  else if (activeMenu === "when") setActiveMenu("who");
                  else handleSearch();
                }}
                className="bg-[#222222] hover:bg-black text-white flex items-center justify-center gap-2 rounded-xl px-12 py-3 text-base font-semibold shadow-sm"
              >
                {activeMenu === "who" ? (
                  <>
                    <Search size={18} strokeWidth={2.5} />
                    Search
                  </>
                ) : (
                  "Next"
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterPanel;
