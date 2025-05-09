import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.loader} data-testid="spinner"></span>
    </div>
  );
};

export default Spinner;
