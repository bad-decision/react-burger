import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useHistory } from "react-router-dom";

import styles from "./burger-ingredient.module.css";
import { BurgerIngredientType } from "../../../../utils/types";
import Modal from "../../../modal/modal";
import IngredientDetails from "../../../ingredient-details/ingredient-details";
import { setIngredientDetails } from "../../../../services/reducers/ingredients-slice";

const BurgerIngredient = ({ ingredient }) => {
	const dispatch = useDispatch();
	//const history = useHistory();
	const [count, setCount] = useState(null);
	const [isOpenModal, setOpenModal] = useState(false);
	const { _id, name, price, image } = ingredient;

	const { bun, insideItems } = useSelector((s) => s.burgerConstructor);

	useEffect(() => {
		if (_id === bun?._id) setCount(2);
		else setCount(insideItems?.filter((x) => x._id === _id).length);
	}, [bun, insideItems, _id]);

	const [{ isDrag }, dragRef] = useDrag({
		type: "newIngredient",
		item: { _id },
		collect: (monitor) => ({
			isDrag: monitor.isDragging(),
		}),
	});

	const closeModalHandler = () => {
		setOpenModal(false);
		dispatch(setIngredientDetails(null));
	};

	const openModalHandler = () => {
		setOpenModal(true);
		//history.replace({ pathname: '/list' });
		dispatch(setIngredientDetails(ingredient));
	};

	const wrapClass = isDrag ? styles.draggingIngredient : styles.ingredient;

	return (
		<>
			<div className={wrapClass} onClick={openModalHandler} ref={dragRef}>
				{count > 0 && <Counter count={count} size="default" />}
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
				<Modal
					closeModal={closeModalHandler}
					header="Детали ингредиента"
				>
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
