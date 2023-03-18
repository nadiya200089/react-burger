import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import style from './style.module.css';
import classNames from 'classnames';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";

const modalRoot = document.querySelector('#modals');

export const Modal = ({ onClose, children }) => {

   return createPortal(
      <>
         <div className={style.modal}>
         
            <div className={style.close}>
               <CloseIcon type="primary" onClick={onClose} />
            </div>
            {children}
         </div>
         <ModalOverlay onClick={onClose} />
      </>, modalRoot)

}
Modal.propTypes = {
   children: PropTypes.element,
   onClose: PropTypes.node.isRequired
}