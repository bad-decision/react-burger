import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { useGetIngredientsQuery } from '../../services/api/ingredients-api';
import {
  getOrderPrice,
  getOrderTimeStamp,
  getOrderStatus,
} from '../../utils/func';
import { IOrder } from '../../utils/types';
import OrderImages from './components/order-images';
import styles from './order.module.css';

interface IProps {
  isFeed?: boolean;
  order: IOrder;
}

function Order({ isFeed, order }: IProps) {
  const match = useRouteMatch();
  const location = useLocation();
  const { data: allIngredients } = useGetIngredientsQuery(null);

  const { ingredients: ingredientsId, status, number, createdAt, name } = order;

  const orderDateTime = useMemo<string | null>(
    () => getOrderTimeStamp(createdAt),
    [createdAt]
  );

  const orderPrice = useMemo<number | null>(
    () => getOrderPrice(ingredientsId, allIngredients),
    [ingredientsId, allIngredients]
  );

  const orderStatus = useMemo(() => getOrderStatus(status), [status]);

  const orderIngredients = ingredientsId.map((id) =>
    allIngredients?.find((x) => x._id === id)
  );

  if (!order) return null;

  return (
    <Link
      to={{
        pathname: `${match.url}/${number}`,
        state: { background: location },
      }}
      className={`${styles.order} p-6`}
    >
      <div className={`${styles.orderNumber} mb-6`}>
        <span className="text text_type_digits-default">#{number}</span>
        <span className="text text_type_main-default text_color_inactive">
          {orderDateTime}
        </span>
      </div>
      <p className="text text_type_main-medium mb-2">{name}</p>
      {!isFeed && <p className="text text_type_main-small">{orderStatus}</p>}
      <div className={`${styles.imagesPrice} mt-6`}>
        <OrderImages ingredients={orderIngredients} />
        <p className={`${styles.price} text text_type_digits-default`}>
          <span className="mr-2">{orderPrice}</span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </Link>
  );
}

export default Order;
