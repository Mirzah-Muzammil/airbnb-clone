import { useEffect, useRef } from "react";
import type { Dispatch, RefObject, SetStateAction } from "react";
import { ActiveMenu } from "../utils/types";

type UseFilterPanelInteractionsOptions = {
  setActiveMenu: Dispatch<SetStateAction<ActiveMenu>>;
};

export const useFilterPanelInteractions = ({
  setActiveMenu,
}: UseFilterPanelInteractionsOptions) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mobileContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;

      if (
        mobileContainerRef.current &&
        target instanceof Node &&
        mobileContainerRef.current.contains(target)
      ) {
        return;
      }

      if (
        containerRef.current &&
        target instanceof Node &&
        containerRef.current.contains(target)
      ) {
        return;
      }

      if (target instanceof Element && target.closest(".mobile-search-pill")) {
        return;
      }

      setActiveMenu(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setActiveMenu]);

  useEffect(() => {
    const openMobileSearch = () => {
      setActiveMenu("where");
    };

    window.addEventListener("open-mobile-search", openMobileSearch);
    return () =>
      window.removeEventListener("open-mobile-search", openMobileSearch);
  }, [setActiveMenu]);

  return {
    containerRef: containerRef as RefObject<HTMLDivElement>,
    mobileContainerRef: mobileContainerRef as RefObject<HTMLDivElement>,
  };
};
