import { AnimatePresence, motion } from "framer-motion";
import { Search, X, Minus, Plus } from "lucide-react";
import type { RefObject } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import CalendarDayButton from "./CalendarDayButton";
import {
  ActiveMenu,
  Destination,
  GuestCounts,
  GuestType,
} from "../../utils/types";
import { formatDateRangeLabel, getGuestSummary } from "../../utils/utils";

type DesktopFilterPanelProps = {
  containerRef: RefObject<HTMLDivElement>;
  activeMenu: ActiveMenu;
  menuDirection: number;
  query: string;
  setQuery: (value: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  hasActiveFilters: boolean;
  onClearDates: () => void;
  handleSearch: (e?: React.MouseEvent) => void;
  handleMenuChange: (next: ActiveMenu) => void;
  destinations: Destination[];
  guestCounts: GuestCounts;
  guestTypes: GuestType[];
};

const DesktopFilterPanel = ({
  containerRef,
  activeMenu,
  menuDirection,
  query,
  setQuery,
  dateRange,
  setDateRange,
  hasActiveFilters,
  onClearDates,
  handleSearch,
  handleMenuChange,
  destinations,
  guestCounts,
  guestTypes,
}: DesktopFilterPanelProps) => {
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

  const guestSummary = getGuestSummary(guestCounts);

  return (
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
                className={`text-sm font-medium truncate ${
                  query ? "text-gray-800" : "text-gray-500"
                }`}
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
                    onClearDates();
                  }}
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <span
              className={`text-sm font-medium truncate ${
                dateRange?.from ? "text-gray-800" : "text-gray-500"
              }`}
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
              className={`text-sm font-medium truncate ${
                guestSummary === "Add guests"
                  ? "text-gray-500"
                  : "text-gray-800"
              }`}
            >
              {guestSummary}
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
                {guestTypes.map((type, i) => (
                  <div key={type.id}>
                    <div className="flex items-center justify-between py-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">
                          {type.title}
                        </span>
                        <span
                          className={`text-sm text-gray-500 ${
                            type.underline ? "underline cursor-pointer" : ""
                          }`}
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
                          className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition-colors ${
                            type.value === 0
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:border-gray-800 text-gray-500 hover:text-gray-800"
                          }`}
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
                    {i < guestTypes.length - 1 && (
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
  );
};

export default DesktopFilterPanel;
