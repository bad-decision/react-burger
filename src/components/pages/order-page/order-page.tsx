import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetIngredientsQuery } from '../../../services/api/ingredients-api';
import { useGetOrderQuery } from '../../../services/api/order-api';
import {
  getOrderPrice,
  getOrderStatus,
  getOrderTimeStamp,
} from '../../../utils/func';
import ErrorIndicator from '../../error-indicator/error-indicator';
import OrderIngredient from './components/order-ingredient';
import styles from './order-page.module.css';

interface IProps {
  isModal?: boolean;
}

function OrderPage({ isModal = false }: IProps) {
  const { number } = useParams<{ number: string }>();
  const { data: order, isLoading, error } = useGetOrderQuery(number);
  const { data: allIngredients } = useGetIngredientsQuery(null);

  const { name, status, createdAt, ingredients } = order || {};
  const orderStatus = useMemo(() => getOrderStatus(status), [status]);

  const orderDateTime = useMemo<string | null>(
    () => getOrderTimeStamp(createdAt),
    [createdAt]
  );

  const distinctIngredients = ingredients
    ? Array.from(new Set(ingredients))
    : [];

  const orderPrice = useMemo<number | null>(
    () => getOrderPrice(ingredients, allIngredients),
    [ingredients, allIngredients]
  );

  const getIngredientCount = (id: string) =>
    ingredients?.reduce((a, v) => (v === id ? a + 1 : a), 0);

  const getIngredient = (id: string) =>
    allIngredients?.find((x) => x._id === id);

  if (error) return <ErrorIndicator />;
  if (isLoading || !order) return null;

  return (
    <section className={styles.wrap}>
      <p
        className={`${
          !isModal ? styles.orderNumber : ''
        } text text_type_digits-default mb-10`}
      >
        #{number}
      </p>
      <p className="text text_type_main-medium mb-3">{name}</p>
      <p className={`${styles.status} text text_type_main-default mb-15`}>
        {orderStatus}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${styles.consist} custom-scroll mb-10`}>
        {distinctIngredients.map((id) => (
          <OrderIngredient
            key={id}
            count={getIngredientCount(id)}
            ingredient={getIngredient(id)}
          />
        ))}
      </div>
      <div className={styles.datePrice}>
        <span className="text text_type_main-small text_color_inactive">
          {orderDateTime}
        </span>
        <p className={`${styles.price} text text_type_digits-default`}>
          <span className="mr-2">{orderPrice}</span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </section>
  );
}

export default OrderPage;
