import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

import styles from './burger-ingredient.module.css';
import { BurgerIngredientType } from '../../../../utils/types';
import { setIngredientDetails } from '../../../../services/reducers/ingredients-slice';

function BurgerIngredient({ ingredient }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [count, setCount] = useState(null);
  const { _id, name, price, image } = ingredient;

  const { bun, insideItems } = useSelector((s) => s.burgerConstructor);

  useEffect(() => {
    if (_id === bun?._id) setCount(2);
    else setCount(insideItems?.filter((x) => x._id === _id).length);
  }, [bun, insideItems, _id]);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'newIngredient',
    item: { _id },
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
        key={_id}
        to={{
          pathname: `/ingredients/${_id}`,
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

BurgerIngredient.propTypes = {
  ingredient: PropTypes.shape(BurgerIngredientType).isRequired,
};

export default BurgerIngredient;
