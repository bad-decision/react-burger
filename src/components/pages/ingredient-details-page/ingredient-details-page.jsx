import IngredientDetails from "../../ingredient-details/ingredient-details";
import styles from "./ingredient-details-page.module.css";

const IngredientDetailsPage = () => {
	return (
		<div className={styles.wrap}>
			<h2 className="text text_type_main-large pb-3">
				Детали ингредиента
			</h2>
			<IngredientDetails />
		</div>
	);
};

export default IngredientDetailsPage;
