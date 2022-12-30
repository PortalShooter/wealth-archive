import { useCallback } from "react";
import { EventEmitter } from "../utils/EventEmitter";

type CarouselEventTypes =
  | "carousel:to"
  | "carousel:toIndex"
  | "carousel:toPercent"
  | "carousel:toVw"
  | "carousel:by"
  | "carousel:byIndex"
  | "carousel:byPercent"
  | "carousel:byVw";

export interface CarouselEvent {
  type: CarouselEventTypes;
  payload: {
    id: string;
    scrollValue: number;
  };
}

export const carouselEventEmitter = new EventEmitter<CarouselEvent>();

export const useCarousel = () => {
  const carouselToPosition = useCallback((id: string, position: number) => {
    carouselEventEmitter.dispatch({
      type: "carousel:to",
      payload: {
        id,
        scrollValue: position
      }
    })
  }, []);

  const carouselToIndex = useCallback((id: string, index: number) => {
    carouselEventEmitter.dispatch({
      type: "carousel:toIndex",
      payload: {
        id,
        scrollValue: index
      }
    })
  }, []);

  const carouselToPercent = useCallback((id: string, percent: number) => {
    carouselEventEmitter.dispatch({
      type: "carousel:toPercent",
      payload: {
        id,
        scrollValue: percent
      }
    })
  }, []);

  const carouselToVw = useCallback((id: string, vw: number) => {
    carouselEventEmitter.dispatch({
      type: "carousel:toVw",
      payload: {
        id,
        scrollValue: vw
      }
    })
  }, []);

  const carouselByPosition = useCallback((id: string, position: number) => {
    carouselEventEmitter.dispatch({
      type: "carousel:by",
      payload: {
        id,
        scrollValue: position
      }
    })
  }, []);

  const carouselByIndex = useCallback((id: string, index: number) => {
    carouselEventEmitter.dispatch({
      type: "carousel:byIndex",
      payload: {
        id,
        scrollValue: index
      }
    })
  }, []);

  const carouselByPercent = useCallback((id: string, percent: number) => {
    carouselEventEmitter.dispatch({
      type: "carousel:byPercent",
      payload: {
        id,
        scrollValue: percent
      }
    })
  }, []);

  const carouselByVw = useCallback((id: string, vw: number) => {
    carouselEventEmitter.dispatch({
      type: "carousel:byVw",
      payload: {
        id,
        scrollValue: vw
      }
    })
  }, []);

  return {
    carouselToPosition,
    carouselToIndex,
    carouselToPercent,
    carouselToVw,
    carouselByPosition,
    carouselByIndex,
    carouselByPercent,
    carouselByVw
  }
}