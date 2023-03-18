import style from './style.module.css';
import classNames from 'classnames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Category } from '../category/category';
import { ingredientsPropTypes } from '../utils/prop-types';

export const BurgerIngredients = ({ ingredients }) => {
    const [current, setCurrent] = useState('buns');
    const buns = ingredients.filter(item => item.type === 'bun');
    const main = ingredients.filter(item => item.type === 'main');
    const sauce = ingredients.filter(item => item.type === 'sauce');

    function handleOnClickTab(tab) {
        setCurrent(tab);
        const title = document.getElementById(tab);
        if (title) title.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className={style.ingredients}>
            <div className={style.menu}>
                <Tab value="buns" active={current === 'buns'} onClick={handleOnClickTab}>
                    Булки
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={handleOnClickTab}>
                    Начинки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={handleOnClickTab}>
                    Соусы
                </Tab>
            </div>
            <div className={classNames(style.wrapper, 'custom-scroll')}>
                <Category
                    title='Булки'
                    id='buns'
                    ingredients={buns}
                />
                <Category
                    title='Начинки'
                    id='main'
                    ingredients={main}
                />
                <Category
                    title='Соусы'
                    id='sauce'
                    ingredients={sauce}
                />
            </div>

        </div>

    )
}

// BurgerIngredients.propTypes = {
//     ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
// }