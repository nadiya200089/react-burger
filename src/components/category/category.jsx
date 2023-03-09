import style from './style.module.css';
import classNames from 'classnames';
import { BurgerIngredient } from '@ya.praktikum/react-developer-burger-ui-components';

export const Category = ({ title, id, ingredients }) => {
console.log(ingredients);
    return (
        <>
            <h2 className="text text_type_main-large">{title}</h2>
            <div className={style.list}>
                
                {ingredients?.map(data => <BurgerIngredient {...data} count={1} />)}
            </div>
        </>
    )

};