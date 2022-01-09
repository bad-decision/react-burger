import PropTypes from "prop-types";

import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ children, onClick }) => {
    return (
        <div className={styles.overlay} onClick={onClick}>
            {children}
        </div>
    );
};

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element,
};

export default ModalOverlay;
