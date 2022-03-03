import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

import styles from './burger-ingredient.module.css';
import { setIngredientDetails } from '../../../../services/reducers/ingredients-slice';
import { IIngredientDetails } from '../../../../utils/types';
import { useAppDispatch, useAppSelector } from '../../../../services/hooks';

interface IProps {
  ingredient: IIngredientDetails;
}

function BurgerIngredient({ ingredient }: IProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [count, setCount] = useState<number>(0);
  const { _id: id, name, price, image } = ingredient;

  const { bun, insideItems } = useAppSelector((s) => s.burgerConstructor);

  useEffect(() => {
    if (id === bun?._id) setCount(2);
    else setCount(insideItems?.filter((x) => x._id === id).length);
  }, [bun, insideItems, id]);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'newIngredient',
    item: { _id: id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const openModalHandler = () => {
    dispatch(setIngredientDetails(ingredient));
  };

  const wrapClass = isDrag ? styles.draggingIngredient : styles.ingredient;

  return (
    <div className={wrapClass} ref={dragRef}>
      <Link
        key={id}
        to={{
          pathname: `/ingredients/${id}`,
          state: { background: location },
        }}
        onClick={openModalHandler}
        className={styles.link}
      >
        {count > 0 && <Counter count={count} size="default" />}
        <img src={image} className="ml-4 mr-4" alt={name} />

        <p
          className={`${styles.price} text text_type_digits-default mt-1 mb-1`}
        >
          <span className="mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default">{name}</p>
      </Link>
    </div>
  );
}

export default BurgerIngredient;
