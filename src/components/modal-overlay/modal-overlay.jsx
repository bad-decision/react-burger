import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

function ModalOverlay({ onClick }) {
  return (
    <div className={styles.overlay} onClick={onClick} aria-hidden="true" />
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
