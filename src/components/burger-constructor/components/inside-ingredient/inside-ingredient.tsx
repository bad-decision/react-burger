import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import styles from './inside-ingredient.module.css';
import { swapInsideIngredients } from '../../../../services/reducers/burger-constructor-slice';
import { IIngredientDetails } from '../../../../utils/types';

interface IProps {
  ingredient: IIngredientDetails;
  handleClose: () => void;
  index: number;
}

function InsideIngredient({ ingredient, handleClose, index }: IProps) {
  const { _hash: hash, image_mobile: imageMobile, price, name } = ingredient;
  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const swapIngredients = (index1: number, index2: number) => {
    dispatch(swapInsideIngredients({ index1, index2 }));
  };

  const [, drop] = useDrop({
    accept: 'sortIngredient',
    hover(item: { index: number }, monitor) {
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
      if (clientOffset) {
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
      }
    },
  });

  const [{ isDrag }, drag] = useDrag({
    type: 'sortIngredient',
    item: { _hash: hash, index },
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

export default InsideIngredient;
