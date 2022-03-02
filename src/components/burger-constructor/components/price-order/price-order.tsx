import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './price-order.module.css';

interface IProps {
  totalPrice: number;
  onClick: () => void;
}

function PriceOrder({ totalPrice, onClick }: IProps) {
  return (
    <div className={styles.order}>
      <span className="text text_type_digits-medium mr-10">
        {totalPrice || 0} <CurrencyIcon type="primary" />
      </span>

      <Button type="primary" size="large" onClick={onClick}>
        Оформить заказ
      </Button>
    </div>
  );
}

export default PriceOrder;
