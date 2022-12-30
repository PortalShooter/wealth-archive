import { useCallback } from "react";
import { carouselEventEmitter, CarouselEvent } from "../useCarousel";

interface CarouselControlProps {
  id: string;
  mode?: "to" | "by";
  scrollValue: number;
  scrollUnits?: "index" | "px" | "%" | "vw";
  children?: string | React.ReactElement | React.ReactElement[];
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export const CarouselControl = ({
  id,
  mode = "by",
  scrollValue,
  scrollUnits = "index",
  children,
  className,
  style,
  ariaLabel,
}: CarouselControlProps) => {
  const handleClick = useCallback(() => {
    const type: CarouselEvent["type"] | undefined =
      mode === "by"
        ? scrollUnits === "px"
          ? "carousel:by"
          : scrollUnits === "%"
          ? "carousel:byPercent"
          : scrollUnits === "vw"
          ? "carousel:byVw"
          : scrollUnits === "index"
          ? "carousel:byIndex"
          : undefined
        : mode === "to"
        ? scrollUnits === "px"
          ? "carousel:to"
          : scrollUnits === "%"
          ? "carousel:toPercent"
          : scrollUnits === "vw"
          ? "carousel:toVw"
          : scrollUnits === "index"
          ? "carousel:toIndex"
          : undefined
        : undefined;

    if (type) {
      carouselEventEmitter.dispatch({
        type: type,
        payload: {
          id: id,
          scrollValue: scrollValue,
        },
      });
    }
  }, [id, mode, scrollUnits, scrollValue]);

  return (
    <button onClick={handleClick} className={className} style={style} aria-label={ariaLabel}>
      {children}
    </button>
  );
};
