import PropTypes from "prop-types";
import style from "./style.module.css";

export const ModalOverlay = ({ onClick }) => {
  return <div onClick={onClick} className={style.overlay}></div>;
};
ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
