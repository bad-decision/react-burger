import {
	Button,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import styles from "./price-order.module.css";

const PriceOrder = ({ totalPrice, onClick }) => {
	return (
		<div className={styles.order}>
			<span className="text text_type_digits-medium mr-10">
				{totalPrice ? totalPrice : 0} <CurrencyIcon type="primary" />
			</span>

			<Button type="primary" size="large" onClick={onClick}>
				Оформить заказ
			</Button>
		</div>
	);
};

PriceOrder.propTypes = {
	totalPrice: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default PriceOrder;
