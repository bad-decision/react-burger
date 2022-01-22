import {
	ConstructorElement,
	DragIcon,
	CurrencyIcon,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useContext, useState } from "react";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { BurgerConstructorContext } from "../../services/burger-constructor-context";
import OrderService from "../../services/order-service";
import ErrorIndicator from "../error-indicator/error-indicator";
import { OrderContext } from "../../services/order-context";

const BurgerConstructor = () => {
	const { bun, inside } = useContext(BurgerConstructorContext);
	const [isOpenModal, setOpenModal] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [orderNumber, setOrderNumber] = useState(null);

	const closeModal = () => {
		setOpenModal(false);
	};

	const doOrder = () => {
		const service = new OrderService();
		service
			.setOrder({
				ingredients: [bun._id, ...inside.map(x => x._id), bun._id]
			})
			.then((res) => {
				setOrderNumber(res.order.number);
				setOpenModal(true);
			})
			.catch(() => {
				setHasError(true);
			});
	};

	const totalPrice =
		inside.reduce((sum, item) => sum + item.price, 0) + bun.price * 2;

	if (hasError)
		return <ErrorIndicator />

	return (
		<section className={`${styles.section} pt-25 pl-4 pr-4`}>
			<div className={`${styles.elements} mb-10`}>
				<div className="pl-8">
					<ConstructorElement
						type="top"
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image_mobile}
					/>
				</div>

				<div className={`${styles.items} custom-scroll`}>
					{inside.map((item) => {
						return (
							<div className={styles.item} key={item._id}>
								<DragIcon type="primary" />
								<ConstructorElement
									text={item.name}
									price={item.price}
									thumbnail={item.image_mobile}
								/>
							</div>
						);
					})}
				</div>

				<div className="pl-8">
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image_mobile}
					/>
				</div>
			</div>

			<div className={styles.order}>
				<span className="text text_type_digits-medium mr-10">
					{totalPrice} <CurrencyIcon type="primary" />
				</span>

				<Button type="primary" size="large" onClick={() => doOrder()}>
					Оформить заказ
				</Button>
			</div>

			{isOpenModal && (
				<Modal closeModal={closeModal}>
					<OrderContext.Provider value={orderNumber}>
						<OrderDetails />
					</OrderContext.Provider>
				</Modal>
			)}
		</section>
	);
};

export default BurgerConstructor;
