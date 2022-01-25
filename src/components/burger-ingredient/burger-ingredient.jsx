import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import styles from "./burger-ingredient.module.css";
import { BurgerIngredientType } from "../../utils/types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { setModalIngredient } from "../../services/reducers/ingredients-slice";

const BurgerIngredient = ({ ingredient }) => {
	const dispatch = useDispatch();
	const [isOpenModal, setOpenModal] = useState(false);
	const { name, price, image } = ingredient;

	const closeModal = () => {
		setOpenModal(false);
		dispatch(setModalIngredient(null));
	};

	const openModal = () => {
		setOpenModal(true);
		dispatch(setModalIngredient(ingredient));
	};

	return (
		<>
			<div className={styles.ingredient} onClick={openModal}>
				<Counter count={1} size="default" />
				<img src={image} className="ml-4 mr-4" alt={name} />

				<p
					className={`${styles.price} text text_type_digits-default mt-1 mb-1`}
				>
					<span className="mr-2">{price}</span>
					<CurrencyIcon type="primary" />
				</p>
				<p className="text text_type_main-default">{name}</p>
			</div>

			{isOpenModal && (
				<Modal closeModal={closeModal} header="Детали ингредиента">
					<IngredientDetails />
				</Modal>
			)}
		</>
	);
};

BurgerIngredient.propTypes = {
	ingredient: PropTypes.shape(BurgerIngredientType).isRequired,
};

export default BurgerIngredient;
