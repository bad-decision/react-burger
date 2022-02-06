import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDrop } from "react-dnd";

import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import Spinner from "../spinner/spinner";
import InsideIngredient from "./components/inside-ingredient/inside-ingredient";
import ConstructorBun from "./components/constructor-bun/constructor-bun";
import PriceOrder from "./components/price-order/price-order";

import { useMakeOrderMutation } from "../../services/api/order-api";
import { ingredientsApi } from "../../services/api/ingredients-api";
import { BUN } from "../../utils/ingredientTypes";
import {
	addInsideIngredient,
	clearConstructor,
	removeInsideIngredient,
	setBun,
} from "../../services/reducers/burger-constructor-slice";
import { setHash } from "../../utils/func";
import ErrorIndicator from "../error-indicator/error-indicator";
import { LOGIN_URL } from "../../utils/url";

const BurgerConstructor = () => {
	const [isOpenModal, setOpenModal] = useState(false);
	const { bun, insideItems } = useSelector((s) => s.burgerConstructor);
	const { data: ingredients } =
		ingredientsApi.endpoints.getIngredients.useQueryState();
	const { user } = useSelector((s) => s.auth);
	const history = useHistory();

	const dispatch = useDispatch();

	const [
		makeOrder,
		{
			error: makeOrderError,
			data: orderNumber,
			isLoading: makeOrderLoading,
		},
	] = useMakeOrderMutation();

	const [{ isConstructorHover }, constructorTarget] = useDrop({
		accept: "newIngredient",
		drop(item) {
			addIngredientDropHandler(item);
		},
		collect: (monitor) => ({
			isConstructorHover: monitor.isOver(),
		}),
	});

	const addIngredientDropHandler = (item) => {
		const ingredient = ingredients.find((x) => x._id === item._id);
		const { type, _id } = ingredient;
		const ingredientWithHash = { ...ingredient, _hash: setHash(_id) };

		if (!bun && type !== BUN) return;
		else if (type === BUN) dispatch(setBun(ingredient));
		else dispatch(addInsideIngredient(ingredientWithHash));
	};

	const closeModalHandler = () => {
		setOpenModal(false);
	};

	const makeOrderHandler = () => {
		if (!user) history.push(LOGIN_URL);
		else {
			setOpenModal(true);
			makeOrder({
				ingredients: [
					bun._id,
					...insideItems.map((x) => x._id),
					bun._id,
				],
			}).then(() => {
				setOpenModal(true);
				dispatch(clearConstructor());
			});
		}
	};

	const removeInsideItemHandler = (hash) => {
		dispatch(removeInsideIngredient(hash));
	};

	const totalPrice = useMemo(
		() =>
			insideItems?.reduce(
				(sum, item) => sum + item.price,
				bun?.price * 2
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
								handleClose={() =>
									removeInsideItemHandler(item._hash)
								}
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
};

export default BurgerConstructor;
