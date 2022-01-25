import {
	ConstructorElement,
	DragIcon,
	CurrencyIcon,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useState } from "react";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import ErrorIndicator from "../error-indicator/error-indicator";
import { useGetIngredientsQuery } from "../../services/api/ingredients-api";
import Spinner from "../spinner/spinner";
import { useMakeOrderMutation } from "../../services/api/order-api";
import { useSelector } from "react-redux";

const BurgerConstructor = () => {
	const { bun, insideItems } = useSelector(
		(state) => state.burgerConstructor
	);
	const [isOpenModal, setOpenModal] = useState(false);

	const [
		makeOrder,
		{
			error: makeOrderError,
			data: orderNumber,
			isLoading: makeOrderLoading,
		},
	] = useMakeOrderMutation();

	const closeModal = () => {
		setOpenModal(false);
	};

	const onOrderClick = () => {
		setOpenModal(true);
		makeOrder({
			ingredients: [bun._id, ...insideItems.map((x) => x._id), bun._id],
		});
	};

	const totalPrice = useMemo(
		() =>
			insideItems?.reduce(
				(sum, item) => sum + item.price,
				bun?.price * 2
			),
		[insideItems, bun]
	);

	// if (getIngredientsError || makeOrderError) return <ErrorIndicator />;
	// if (getIngredientsLoading) return <Spinner />;

	//if (!bun || !insideItems) return null;

	return (
		<section className={`${styles.section} pt-25 pl-4 pr-4`}>
			<div className={`${styles.elements} mb-10`}>
				{bun && (
					<div className="pl-8">
						<ConstructorElement
							type="top"
							isLocked
							text={`${bun.name} (верх)`}
							price={bun.price}
							thumbnail={bun.image_mobile}
						/>
					</div>
				)}

				{insideItems && (
					<div className={`${styles.items} custom-scroll`}>
						{insideItems.map((item) => {
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
				)}

				{bun && (
					<div className="pl-8">
						<ConstructorElement
							type="bottom"
							isLocked
							text={`${bun.name} (низ)`}
							price={bun.price}
							thumbnail={bun.image_mobile}
						/>
					</div>
				)}
			</div>

			<div className={styles.order}>
				<span className="text text_type_digits-medium mr-10">
					{totalPrice ? totalPrice : 0}{" "}
					<CurrencyIcon type="primary" />
				</span>

				<Button
					type="primary"
					size="large"
					onClick={() => onOrderClick()}
				>
					Оформить заказ
				</Button>
			</div>

			{isOpenModal && orderNumber && (
				<Modal closeModal={closeModal}>
					{makeOrderLoading && <Spinner />}
					<OrderDetails orderNumber={orderNumber} />
				</Modal>
			)}
		</section>
	);
};

export default BurgerConstructor;
