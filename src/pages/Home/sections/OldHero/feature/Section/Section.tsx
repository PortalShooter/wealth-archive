import classNames from "classnames/bind";
import styles from "./Section.module.scss";
const cx = classNames.bind(styles);

interface Section {
  (props: {
    className?: string;
    children: React.ReactNode;
  }): React.ReactElement;
}

export const Section: Section = ({ className, children }) => {
  return <div className={cx(styles.Section, className)}>{children}</div>;
};
