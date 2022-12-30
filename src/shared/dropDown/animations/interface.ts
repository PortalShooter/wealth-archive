import React from "react";

export interface AnimationOptions {
  innerWrapper: React.RefObject<HTMLDivElement>;
  outerWrapper: React.RefObject<HTMLDivElement>;
  maxHeight: number;
  dispatchResize: boolean;
}

export interface Animation {
  open: (openOptions: {
    duration: number
  }) => void;

  close: (closeOptions: {
    duration: number
  }) => void;

  destroy: VoidFunction;
}