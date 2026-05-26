import { AnimatePresence, motion } from "framer-motion";
import { Bell, Compass, Home, Minus, Plus, Search, X } from "lucide-react";
import type { RefObject } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import CalendarDayButton from "./CalendarDayButton";
import type {
  ActiveMenu,
  Destination,
  GuestCounts,
  GuestType,
} from "../../utils/types";
import { formatDateRangeLabel, getGuestSummary } from "../../utils/utils";

type MobileFilterPanelProps = {
  mobileContainerRef: RefObject<HTMLDivElement>;
  activeMenu: ActiveMenu;
  setActiveMenu: (menu: ActiveMenu) => void;
  query: string;
  setQuery: (value: string) => void;
  dateRange: DateRange | undefined;
  handleMobileDayClick: (day: Date) => void;
  destinations: Destination[];
  guestCounts: GuestCounts;
  guestTypes: GuestType[];
  handleMenuChange: (next: ActiveMenu) => void;
  onClearAll: () => void;
  onMobileNext: () => void;
};

const MobileFilterPanel = ({
  mobileContainerRef,
  activeMenu,
  setActiveMenu,
  query,
  setQuery,
  dateRange,
  handleMobileDayClick,
  destinations,
  guestCounts,
  guestTypes,
  handleMenuChange,
  onClearAll,
  onMobileNext,
}: MobileFilterPanelProps) => {
  const guestSummary = getGuestSummary(guestCounts);

  return (
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
              className={`bg-white max-h-[500px] rounded-3xl shadow-sm flex flex-col overflow-hidden transition-all duration-300 ${
                activeMenu === "where" ? "p-5 pb-2" : "p-4"
              }`}
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
              className={`bg-white rounded-3xl max-h-[500px] shadow-sm flex flex-col overflow-hidden transition-all duration-300 ${
                activeMenu === "when" ? "p-5 pb-2" : "px-5 py-4"
              }`}
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
              className={`bg-white rounded-3xl shadow-sm flex flex-col overflow-hidden transition-all duration-300 ${
                activeMenu === "who" ? "p-5 pb-2" : "px-5 py-4"
              }`}
            >
              {activeMenu === "who" ? (
                <>
                  <h2 className="text-[26px] font-bold text-gray-800 mb-6 px-1">
                    Who?
                  </h2>
                  <div className="flex flex-col">
                    {guestTypes.map((type, i) => (
                      <div
                        key={type.id}
                        className={`flex items-center justify-between py-6 ${
                          i !== guestTypes.length - 1
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
                  <span className="text-sm font-medium text-gray-500">Who</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {guestSummary}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Bottom Bar Navbar Replacement + Search trigger */}
          <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center pb-8 z-[1100]">
            <button
              onClick={onClearAll}
              className="text-[15px] font-semibold underline text-gray-800 py-1"
            >
              Clear all
            </button>
            <button
              onClick={onMobileNext}
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
  );
};

export default MobileFilterPanel;
