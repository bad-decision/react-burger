import styles from './error-indicator.module.css';

function ErrorIndicator() {
  return (
    <p className={styles.error}>
      Произошла ошибка, попробуйте обновить страницу
    </p>
  );
}

export default ErrorIndicator;
