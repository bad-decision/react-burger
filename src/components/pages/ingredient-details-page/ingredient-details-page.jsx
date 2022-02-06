import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { useGetIngredientsQuery } from "../../../services/api/ingredients-api";
import { setIngredientDetails } from "../../../services/reducers/ingredients-slice";
import ErrorIndicator from "../../error-indicator/error-indicator";
import IngredientDetails from "../../ingredient-details/ingredient-details";
import Spinner from "../../spinner/spinner";
import styles from "./ingredient-details-page.module.css";

const IngredientDetailsPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams();
	const { data: ingredients, error, isLoading } = useGetIngredientsQuery();

	useEffect(() => {
		const ingredient = ingredients?.find((x) => x._id === id);
		if (ingredient) dispatch(setIngredientDetails(ingredient));
		//if (ingredients && !ingredient) history.push("/");
	}, [ingredients, id, dispatch, history]);

	if (error) return <ErrorIndicator />;
	if (isLoading) return <Spinner />;

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
