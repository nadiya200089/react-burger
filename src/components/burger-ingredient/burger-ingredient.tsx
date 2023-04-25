import classNames from "classnames";
import styles from "./style.module.css";
import { useLocation, Link } from "react-router-dom";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface IBurgerIngredient {
  image: string;
  id: string;
  price: number;
  name: string;
  count: number;
  onClick: () => void;
  className?: boolean| string;
  style: any;
}

export const BurgerIngredient: React.FC<IBurgerIngredient> = (props) => {
  const { image, id, price, name, count, onClick, className, style } = props;
  const location = useLocation();

  return (
    <Link 
    onClick={onClick}
    to={{ pathname: `/ingredientDetails/${id}` }} 
    state={{ background: location }} 
    replace
    key={id}
    className={styles.ingredient} >
     
        {count > 0 && <Counter count={Number(count)} />}
        <img src={image} alt={name} />
        <div
          className={classNames(styles.burger_ingredient_cost, "mt-2", "mb-2")}
        >
          <p className="text text_type_digits-default mr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p
          className={classNames(
            styles.burger_ingredient_text,
            "text",
            "text_type_main-default"
          )}
        >
          {name}
        </p>
    </Link>
  );
};

