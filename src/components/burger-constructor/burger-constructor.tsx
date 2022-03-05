import { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';

import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import Spinner from '../spinner/spinner';
import InsideIngredient from './components/inside-ingredient/inside-ingredient';
import ConstructorBun from './components/constructor-bun/constructor-bun';
import PriceOrder from './components/price-order/price-order';

import { useMakeOrderMutation } from '../../services/api/order-api';
import { useGetIngredientsQuery } from '../../services/api/ingredients-api';
import { BUN } from '../../utils/ingredientTypes';
import {
  addInsideIngredient,
  clearConstructor,
  removeInsideIngredient,
  setBun,
} from '../../services/reducers/burger-constructor-slice';
import { getAccessToken, setHash } from '../../utils/func';
import ErrorIndicator from '../error-indicator/error-indicator';
import { LOGIN_URL } from '../../utils/url';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { IIngredientDetails } from '../../utils/types';

function BurgerConstructor() {
  const [isOpenModal, setOpenModal] = useState(false);
  const { bun, insideItems } = useAppSelector((s) => s.burgerConstructor);
  const { data: ingredients } = useGetIngredientsQuery(null);
  const { user } = useAppSelector((s) => s.auth);
  const history = useHistory();

  const dispatch = useAppDispatch();

  const [
    makeOrder,
    { error: makeOrderError, data: orderNumber, isLoading: makeOrderLoading },
  ] = useMakeOrderMutation();

  const addIngredientDropHandler = (item: IIngredientDetails) => {
    const ingredient = ingredients?.find((x) => x._id === item._id);
    if (ingredient) {
      const { type, _id: id } = ingredient;
      const ingredientWithHash = { ...ingredient, _hash: setHash(id) };

      if (!bun && type !== BUN) return;
      if (type === BUN) dispatch(setBun(ingredient));
      else dispatch(addInsideIngredient(ingredientWithHash));
    }
  };

  const [{ isConstructorHover }, constructorTarget] = useDrop({
    accept: 'newIngredient',
    drop(item: IIngredientDetails) {
      addIngredientDropHandler(item);
    },
    collect: (monitor) => ({
      isConstructorHover: monitor.isOver(),
    }),
  });

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const makeOrderHandler = () => {
    if (!user && !getAccessToken()) history.push(LOGIN_URL);
    else {
      setOpenModal(true);
      makeOrder({
        ingredients: [bun?._id, ...insideItems.map((x) => x._id), bun?._id],
      })
        .then(() => {
          setOpenModal(true);
          dispatch(clearConstructor());
        })
        .catch();
    }
  };

  const removeInsideItemHandler = (hash: string) => {
    dispatch(removeInsideIngredient(hash));
  };

  const totalPrice = useMemo(
    () =>
      insideItems?.reduce(
        (sum, item) => sum + item.price,
        bun ? bun.price * 2 : 0
      ),
    [insideItems, bun]
  );

  const constructorTargetClass = isConstructorHover
    ? styles.hoveredElements
    : styles.elements;

  if (makeOrderLoading) return <Spinner />;
  if (makeOrderError) return <ErrorIndicator />;

  return (
    <section className={`${styles.section} pt-25 pl-4 pr-4`}>
      <div
        className={`${constructorTargetClass} mb-10`}
        ref={constructorTarget}
      >
        {bun && <ConstructorBun bun={bun} type="top" />}

        {insideItems && (
          <div className={`${styles.items} custom-scroll`}>
            {insideItems.map((item, index) => (
              <InsideIngredient
                ingredient={item}
                key={item._hash}
                index={index}
                handleClose={() => removeInsideItemHandler(item._hash)}
              />
            ))}
          </div>
        )}
        {bun && <ConstructorBun bun={bun} type="bottom" />}
      </div>

      <PriceOrder onClick={makeOrderHandler} totalPrice={totalPrice} />

      {isOpenModal && orderNumber && (
        <Modal closeModal={closeModalHandler}>
          <>
            {makeOrderLoading && <Spinner />}
            <OrderDetails orderNumber={orderNumber} />
          </>
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
