import PropTypes from "prop-types";
import { IngredientDetailsType } from "../../utils/types";
import Value from "../value/value";
import styles from "./ingredient-details.module.css";

const IngredientDetails = ({ ingredient }) => {
    const { image_large : imageLarge, name, calories, proteins, fat, carbohydrates } =
        ingredient;

    return (
        <div className={`${styles.wrap}`}>
            <img src={imageLarge} alt={name} />
            <h3 className="mt-4 mb-8 text text_type_main-medium">{name}</h3>
            <div className={`${styles.values} mb-15`}>
                <Value name="Калорий, ккал" value={calories} />
                <Value name="Белки, г" value={proteins} />
                <Value name="Жиры, г" value={fat} />
                <Value name="Углеводы, г" value={carbohydrates} />
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingredient: PropTypes.shape(IngredientDetailsType).isRequired,
};

export default IngredientDetails;
