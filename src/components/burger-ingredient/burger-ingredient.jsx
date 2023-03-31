import classNames from 'classnames';
import styles from './style.module.css';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../utils/prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export const BurgerIngredient = (props) => {
    const { 
        image,
        id,
        price,
        name,
        count,
        style,
        onClick
    } = props;
    return (
        <div
            onClick={() => {
                onClick();
            }}
            key={id}
            className={styles.ingredient}
        >
            { count > 0 && <Counter count={Number(count)} />}
            <img src={image} alt={name} />
            <div className={classNames(style.burger_ingredient_cost, 'mt-2', "mb-2")}>
                <p className="text text_type_digits-default mr-2">
                    {price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
    
            <p className={classNames(style.burger_ingredient_text, "text", "text_type_main-default")}>{name}</p>
        </div>
    );

};
