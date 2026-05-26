import type { DayButtonProps } from "react-day-picker";

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

export default CalendarDayButton;
