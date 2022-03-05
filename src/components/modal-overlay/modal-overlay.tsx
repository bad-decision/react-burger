import styles from './modal-overlay.module.css';

interface IProps {
  onClick: () => void;
}

function ModalOverlay({ onClick }: IProps) {
  return (
    <div className={styles.overlay} onClick={onClick} aria-hidden="true" />
  );
}

export default ModalOverlay;
