import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, closeModal, header }) => {
	useEffect(() => {
		const close = (e) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};
		window.addEventListener("keydown", close);
		return () => window.removeEventListener("keydown", close);
	}, [closeModal]);

	return ReactDOM.createPortal(
		<>
			<ModalOverlay onClick={closeModal}></ModalOverlay>

			<div
				className={`${styles.modal}`}
				onClick={(e) => e.stopPropagation()}
			>
				{header && (
					<h2
						className={`${styles.header} text text_type_main-large mt-10 mr-10 ml-10 pt-3 pb-3`}
					>
						{header}
					</h2>
				)}
				<span className={styles.closeIcon}>
					<CloseIcon type="primary" onClick={closeModal} />
				</span>

				{children}
			</div>
		</>,
		modalRoot
	);
};

Modal.propTypes = {
	header: PropTypes.string,
	closeModal: PropTypes.func.isRequired,
	children: PropTypes.element,
};

export default Modal;
