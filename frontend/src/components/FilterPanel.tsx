import { useFilterPanelInteractions } from "../hooks/useFilterPanelInteractions";
import { useFilterPanelState } from "../hooks/useFilterPanelState";
import { FilterPanelProps } from "../utils/types";
import DesktopFilterPanel from "./FilterPanel/DesktopFilterPanel";
import MobileFilterPanel from "./FilterPanel/MobileFilterPanel";

const FilterPanel = ({
  onSearch,
  onClear,
  hasActiveFilters,
}: FilterPanelProps) => {
  const {
    activeMenu,
    setActiveMenu,
    menuDirection,
    query,
    setQuery,
    dateRange,
    setDateRange,
    guestCounts,
    guestTypes,
    destinations,
    handleMenuChange,
    handleSearch,
    handleMobileDayClick,
    clearAll,
    clearDates,
    handleMobileNext,
  } = useFilterPanelState({ onSearch, onClear });

  const { containerRef, mobileContainerRef } = useFilterPanelInteractions({
    setActiveMenu,
  });

  return (
    <>
      <DesktopFilterPanel
        containerRef={containerRef}
        activeMenu={activeMenu}
        menuDirection={menuDirection}
        query={query}
        setQuery={setQuery}
        dateRange={dateRange}
        setDateRange={setDateRange}
        hasActiveFilters={hasActiveFilters}
        onClearDates={clearDates}
        handleSearch={handleSearch}
        handleMenuChange={handleMenuChange}
        destinations={destinations}
        guestCounts={guestCounts}
        guestTypes={guestTypes}
      />
      <MobileFilterPanel
        mobileContainerRef={mobileContainerRef}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        query={query}
        setQuery={setQuery}
        dateRange={dateRange}
        handleMobileDayClick={handleMobileDayClick}
        destinations={destinations}
        guestCounts={guestCounts}
        guestTypes={guestTypes}
        handleMenuChange={handleMenuChange}
        onClearAll={clearAll}
        onMobileNext={handleMobileNext}
      />
    </>
  );
};

export default FilterPanel;
