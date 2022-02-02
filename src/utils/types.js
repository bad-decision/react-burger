import PropTypes from 'prop-types';
import { BUN } from './ingredientTypes';

const DefaultIngredientType = {
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired
}

const BurgerIngredientType = {
	...DefaultIngredientType,
	image: PropTypes.string.isRequired,
}

const ConstructorIngredientType = {
	...DefaultIngredientType,
	_id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	image_mobile: PropTypes.string.isRequired
};

const IngredientDetailsType = {
	name: PropTypes.string.isRequired,
	image_large: PropTypes.string.isRequired,
	calories: PropTypes.number.isRequired,
	proteins: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired
};

const ConstructorBunType = {
	...DefaultIngredientType,
	image_mobile: PropTypes.string.isRequired,
};

const InsideIngredientType = {
	...DefaultIngredientType,
	image_mobile: PropTypes.string.isRequired,
	_hash: PropTypes.string.isRequired
}

export { BurgerIngredientType, ConstructorIngredientType, IngredientDetailsType, ConstructorBunType, InsideIngredientType };