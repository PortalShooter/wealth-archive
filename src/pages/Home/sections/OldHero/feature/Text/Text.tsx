import { CSSProperties, ReactElement } from "react";
import styles from "./Text.module.scss";
import cn from "classnames";

type Colors =
  | "inherit"
  | "white"
  | "yellowTitle"
  | "darkGreen"
  | "black"
  | "darkGrey"
  | "green"
  | "lightGreen";

const colors: {
  [key in Colors]: string;
} = {
  inherit: "inherit",
  white: "#ffffff",
  yellowTitle: "#EFFEB2",
  darkGreen: "#00534F",
  black: "#000000",
  darkGrey: "#1A1A1A",
  green: "#00857C",
  lightGreen: "#75DBD3",
};

export interface Text {
  (props: {
    className?: string;
    children: React.ReactNode;
    color?: Colors;
    textRef?:any;
  }): ReactElement;
}

{
  <div></div>;
  {
    null;
  }
}

export const Text: Text = ({ className, children, color = "inherit",textRef }) => {
  const style: CSSProperties = {
    color: colors[color],
  };

  return (
    <div
      style={style}
      className={cn(styles.Text, color === "white" && styles.white, className)}
      ref={textRef}
    >
      {children}
    </div>
  );
};
