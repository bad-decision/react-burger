import styles from "./burger-type-ingredients.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";

const BurgerTypeIngredients = ({ ingredients, name }) => {
    return (
        <>
            <h3 className="text text_type_main-medium">{name}</h3>
            <div className={`${styles.ingredients} pt-6 pb-10 pl-4`}>
                {ingredients.map((item) => {
                    return (<BurgerIngredient ingredient={item} key={item._id} />);
                })}
            </div>
        </>
    );
};

BurgerTypeIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default BurgerTypeIngredients;
