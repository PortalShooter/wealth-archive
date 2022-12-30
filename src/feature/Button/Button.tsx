import { forwardRef, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button appearence variant. Put your own variant here */
  variant?: "base" | "link";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "base", children, className, ...restProps }, ref) => {
    return (
      <button
        className={classNames(
          styles.Button,
          variant === "link" && styles.Button_Link,
          variant === "button-stroke-with-background" && styles.Button_btn_stroke_with_background,
          className
        )}
        ref={ref}
        type="button"
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
