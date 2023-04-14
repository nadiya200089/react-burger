import classNames from "classnames";
import styles from "./style.module.css";
import PropTypes from "prop-types";
import { useLocation, Link } from "react-router-dom";
import { ingredientsPropTypes } from "../../utils/prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerIngredient = (props) => {
  const { image, id, price, name, count, style, onClick } = props;
  const location = useLocation(); console.log('location', location)

  return (
    <Link style={{textDecoration:'none'}} to={{ pathname: `/ingredientDetails/${id}` }}  state={{ background: location, test: 'lol' }} replace key={id}
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

BurgerIngredient.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number,
};
