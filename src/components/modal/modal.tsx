import { useEffect } from "react";
import { createPortal } from "react-dom";
import style from "./style.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";

const modalRoot: any = document.querySelector("#modals");

type TModal = {
  onClose: ()=> void;
  children?: any;
}
//  type TModalRoot = {
//   modalRoot: Element | DocumentFragment
//  }

export const Modal: React.FC<TModal> = ({ onClose, children }) => {
  
  useEffect(() => {
    const closeByEsc = (target: KeyboardEvent) => {
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

