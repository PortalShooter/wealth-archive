import { MutableRefObject } from "react";

// Styles
const classNames = require("classnames/bind");
const cx = classNames.bind(styles);
import styles from "./Text.module.scss";

export interface TextProps {
  className?: string;
  tagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span";
  textStyles?: "h1" | "h2" | "h3" | "h4" | "h5";
  align?: "left" | "center";
  level?: "1" | "2";
  bold?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  textRef?: MutableRefObject<HTMLElement | null>;
}

export const Text = ({
  className,
  tagName = "span",
  align = "left",
  level = "1",
  textStyles = "h4",
  children,
  style,
  textRef,
  bold = false,
}: TextProps) => {
  const Tag = tagName;

  return (
    <Tag
      className={cx(
        "Text",
        `Text_${tagName === "p" ? tagName + "_" + level : textStyles}`,
        `Text_${align}`,
        bold && "Text_bold",
        className
      )}
      style={style}
      ref={textRef as any}
    >
      {children}
    </Tag>
  );
};
