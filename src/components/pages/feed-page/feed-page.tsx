import { useGetLastOrdersQuery } from '../../../services/api/order-api';
import { MAX_PENDING_ORDERS, MAX_READY_ORDERS } from '../../../utils/const';
import { DONE, PENDING } from '../../../utils/orderStatuses';
import Orders from '../../orders/orders';
import styles from './feed-page.module.css';

function FeedPage() {
  const { data: message } = useGetLastOrdersQuery(null);
  const { total, totalToday, orders } = message || {};

  const readyOrders = orders?.filter((x) => x.status === DONE);
  const sliceReadyOrders =
    readyOrders && readyOrders?.length > MAX_READY_ORDERS
      ? readyOrders?.slice(0, MAX_READY_ORDERS)
      : readyOrders;

  const pendingOrders = orders?.filter((x) => x.status === PENDING);
  const slicePendingOrders =
    pendingOrders && pendingOrders?.length > MAX_PENDING_ORDERS
      ? pendingOrders?.slice(0, MAX_PENDING_ORDERS)
      : pendingOrders;

  return (
    <>
      <h2 className="text text_type_main-large mt-10">Лента заказов</h2>
      <section className={`${styles.columns} mt-5`}>
        <Orders isFeed orders={orders} />
        <div className={styles.statBlock}>
          <div className={`${styles.readyWorkBlock} mb-15`}>
            <div>
              <p className="text text_type_main-medium pb-2">Готовы:</p>
              <div className={styles.readyWrap}>
                {sliceReadyOrders?.map((order) => {
                  const { _id: id, number } = order;
                  return (
                    <p
                      key={id}
                      className={`${styles.readyNumber} text text_type_digits-default mb-1`}
                    >
                      {number}
                    </p>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text text_type_main-medium pb-2">В работе:</p>
              {slicePendingOrders?.map((order) => {
                const { _id: id, number } = order;
                return (
                  <p key={id} className="text text_type_digits-default mb-2">
                    {number}
                  </p>
                );
              })}
            </div>
          </div>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p
            className={`${styles.allTimeNumber} text text_type_digits-large mb-15`}
          >
            {total}
          </p>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className={`${styles.todayNumber} text text_type_digits-large`}>
            {totalToday}
          </p>
        </div>
      </section>
    </>
  );
}

export default FeedPage;
