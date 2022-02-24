import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import styles from './inside-ingredient.module.css';
import { InsideIngredientType } from '../../../../utils/types';
import { swapInsideIngredients } from '../../../../services/reducers/burger-constructor-slice';

function InsideIngredient({ ingredient, handleClose, index }) {
  const { _hash, image_mobile: imageMobile, price, name } = ingredient;
  const ref = useRef(null);
  const dispatch = useDispatch();

  const swapIngredients = (index1, index2) => {
    dispatch(swapInsideIngredients({ index1, index2 }));
  };

  const [, drop] = useDrop({
    accept: 'sortIngredient',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      swapIngredients(dragIndex, hoverIndex);
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDrag }, drag] = useDrag({
    type: 'sortIngredient',
    item: { _hash, index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const opacity = isDrag ? 0 : 1;
  drag(drop(ref));

  return (
    <div className={styles.ingredient} ref={ref} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={imageMobile}
        handleClose={handleClose}
      />
    </div>
  );
}

InsideIngredient.propTypes = {
  // eslint-disable-next-line react/require-default-props
  ingredient: PropTypes.shape(InsideIngredientType),
  handleClose: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default InsideIngredient;
