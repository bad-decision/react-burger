import PropTypes from 'prop-types';

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

export { BurgerIngredientType, ConstructorIngredientType };