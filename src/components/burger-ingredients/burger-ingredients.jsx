import style from './style.module.css';
import classNames from 'classnames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Category } from '../category/category';
import { ingredientsPropTypes } from '../utils/prop-types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addConstructor } from '../services/reducers/constructor';
export const BurgerIngredients = () => {
    const [current, setCurrent] = useState('buns');
    const dispatch = useDispatch();


    const ingredients = useSelector(state => state.ingredientsStore.data);

    const buns = ingredients.filter(item => item.type === 'bun');

    if (buns && buns.length) {
        console.log('buns', buns);
        dispatch(addConstructor(buns[0]));
    }

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

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
}