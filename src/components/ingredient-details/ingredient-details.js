import PropTypes from "prop-types";
import { IngredientDetailsType } from "../../utils/types";
import Value from "../value/value";
import styles from "./ingredient-details.module.css";

const IngredientDetails = ({ ingredient }) => {
    return (
        <div className={`${styles.wrap}`}>
            <img src={ingredient.image_large} alt={ingredient.name} />
            <p className="mt-4 mb-8 text text_type_main-medium">
                {ingredient.name}
            </p>
            <div className={`${styles.values} mb-15`}>
                <Value name="Калорий, ккал" value={ingredient.calories} />
                <Value name="Белки, г" value={ingredient.proteins} />
                <Value name="Жиры, г" value={ingredient.fat} />
                <Value name="Углеводы, г" value={ingredient.carbohydrates} />
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingredient: PropTypes.shape(IngredientDetailsType).isRequired,
};

export default IngredientDetails;
