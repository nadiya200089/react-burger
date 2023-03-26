import style from '../style.module.css';
import classNames from 'classnames';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';


import { useDrag } from 'react-dnd';


export const BurgerItem = (props) => {
    const { data } = props;

    const [{ isDragging }, dragRef] = useDrag(
        () => ({
          type: 'main',
          collect: (monitor) => ({
            isDragging: Boolean(monitor.isDragging())
          }),
            //   drop: () => console.log('test')
        }),
        []
    );
   return (
        <div ref={dragRef} style={{opacity: isDragging ? 0.1 : 1 }}  key={data._id} className={classNames(style.main, "mr-4")}>
            <DragIcon  type="primary" /> <ConstructorElement className="ml-2 mr-2 mb-2 mt-2"
                key={data._id} text={data.name} thumbnail={data.image} {...data} /> 
        </div>
   )
}
