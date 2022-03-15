import { IOrder } from '../../utils/types';
import Order from '../order/order';
import styles from './orders.module.css';

interface IProps {
  isFeed?: boolean;
  orders?: IOrder[] | undefined;
}

function Orders({ isFeed = false, orders }: IProps) {
  return (
    <div className={`${styles.wrap} custom-scroll`}>
      {orders?.map((order) => (
        <Order isFeed={isFeed} order={order} key={order._id} />
      ))}
    </div>
  );
}

export default Orders;
