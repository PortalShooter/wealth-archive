import { FC, useRef } from "react";
import { default as NextImage, ImageProps as NextImageProps } from "next/image";
import classNames from "classnames";

import { useScrollTrigger } from "@/shared/scroll";

import styles from "./Image.module.scss";

export interface ImageProps extends NextImageProps {
  wrapperClassName?: boolean;
}

export const Image: FC<ImageProps> = ({
  src,
  width,
  height,
  alt = "",
  layout = "intrinsic",
  className,
  wrapperClassName,
  ...restProps
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isTriggered = useScrollTrigger(ref);

  if (!src) {
    return null;
  }

  return (
    <div
      className={classNames(
        styles.ImageWrapper,
        isTriggered && styles.ImageWrapper_Triggered,
        wrapperClassName
      )}
      ref={ref}
    >
      <NextImage
        className={classNames(styles.Image, className)}
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout={layout}
        loading="eager"
        unoptimized
        {...restProps}
      />
    </div>
  );
};
