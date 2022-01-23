import styles from "./order-details.module.css";
import done from "../../images/done.gif";
import { useContext } from "react";
import { OrderContext } from "../../services/order-context";

const OrderDetails = () => {
    const orderNumber = useContext(OrderContext);
    return (
        <div className={`${styles.wrap} mt-30 mb-30`}>
            <p className={`${styles.orderNumber} text text_type_digits-large`}>
                {orderNumber}
            </p>
            <p className="text text_type_main-medium mt-8 mb-15">
                идентификатор заказа
            </p>
            <img className={styles.done} src={done} alt="Заказ оформлен" />
            <p className="text text_type_main-default mt-15">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive mt-2">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};

export default OrderDetails;
