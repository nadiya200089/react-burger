import style from './style.module.css';
import classNames from 'classnames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';
import { useState } from 'react'
import { Category } from '../category/category';



export const BurgerIngredients = ({ ingredients }) => {
    const [current, setCurrent] = useState('one');
    

    const buns = ingredients.filter( item => item.type === 'bun');
    const main = ingredients.filter( item => item.type === 'main');
    const sauce = ingredients.filter( item => item.type === 'sauce');

    return (
    <section className={style.ingredients}>
        <div className={style.menu}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                One
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Two
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Three
            </Tab>
        </div>
        <Category 
            title='Булки'
            ingredients={buns}
            />
            <Category 
            title='Начинки'
            ingredients={main}
            />
            <Category 
            title='Соусы'
            ingredients={sauce}
            />
    </section>
    )
}