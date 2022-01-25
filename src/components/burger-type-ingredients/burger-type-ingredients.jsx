import React from "react";

import styles from "./burger-type-ingredients.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import { ingredientsApi } from "../../services/api/ingredients-api";

const BurgerTypeIngredients = React.forwardRef(({ type, name }, ref) => {
	const { data } = ingredientsApi.endpoints.getIngredients.useQueryState();
	const ingredients = data?.filter((x) => x.type === type);

	return (
		<>
			<h3 className="text text_type_main-medium" ref={ref}>
				{name}
			</h3>
			<div className={`${styles.ingredients} pt-6 pb-10 pl-4`}>
				{ingredients?.map((item) => {
					return (
						<BurgerIngredient ingredient={item} key={item._id} />
					);
				})}
			</div>
		</>
	);
});

BurgerTypeIngredients.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default BurgerTypeIngredients;
