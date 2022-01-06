import React from 'react';
import styles from './burger-type-ingredients.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import PropTypes from 'prop-types';

const BurgerTypeIngredients = ({ data, name }) => {
	return (
		<>
			<h3 className="text text_type_main-medium">
				{name}
			</h3>
			<div className={`${styles.ingredients} pt-6 pb-10 pl-4`}>
				{data.map(item => {
					return (
						<BurgerIngredient data={item} key={item._id} />
					);
				})}
			</div>
		</>

	);
}

BurgerTypeIngredients.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
	})).isRequired,
}

export default BurgerTypeIngredients;