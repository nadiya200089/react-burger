import style from "./style.module.css";

type TModalOverlay = {
  onClick: ()=> void;
}

export const ModalOverlay: React.FC<TModalOverlay>  = ({ onClick }) => {
  return <div onClick={onClick} className={style.overlay}></div>;
};

