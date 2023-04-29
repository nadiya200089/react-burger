import style from "./style.module.css";
import { useSelector } from "react-redux";
import { RootStore } from "../../services/store";

export const OrderDetails = () => {
  const { order } = useSelector((state: RootStore) => state.orderStore.data);

  return (
    <div className={style.order_details}>
      <h2 className="text text_type_digits-large mb-8 mt-20">{order}</h2>
      <h3 className="text text_type_main-medium mb-15 mt-0">
        идентификатор заказа
      </h3>
      <div className={style.check_icon} />
      <p className="text text_type_main-small mb-2 mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};