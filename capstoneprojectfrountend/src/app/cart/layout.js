import styles from "../page.module.css";

export default function CartLayout({ children }) {
  return <main className={styles.main}>{children}</main>;
}
