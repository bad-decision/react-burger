import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('react-modals');

interface IProps {
  children: ReactNode;
  closeModal: () => void;
  header?: string;
}

function Modal({ children, closeModal, header }: IProps) {
  useEffect(() => {
    const close: (e: KeyboardEvent) => void = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [closeModal]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={closeModal} />
      <div
        className={`${styles.modal}`}
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
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
    modalRoot as HTMLElement
  );
}

export default Modal;
