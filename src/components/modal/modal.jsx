import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import style from "./style.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";

const modalRoot = document.querySelector("#modals");

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const closeByEsc = (target) => {
      if (target.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEsc);
    return () => document.removeEventListener("keydown", closeByEsc);
  }, []);

  return createPortal(
    <>
      <div className={style.modal}>
        <div className={style.close}>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot
  );
};
Modal.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired,
};
