import classNames from "classnames/bind";
import styles from "./Container.module.scss";
const cx = classNames.bind(styles);

interface Container {
  (props: {
    className?: string;
    children: React.ReactNode;
  }): React.ReactElement;
}

export const Container: Container = ({ className, children }) => {
  return <div className={cx(styles.Container, className)}>{children}</div>;
};
