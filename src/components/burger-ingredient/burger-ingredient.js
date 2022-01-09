import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-ingredient.module.css';
import PropTypes from 'prop-types';
import { BurgerIngredientType } from '../../utils/types';

const BurgerIngredient = ({ data }) => {
	return (
		<div className={styles.ingredient}>
			<img src={data.image} className="ml-4 mr-4" alt={data.name} />

			<p className={`${styles.price} text text_type_digits-default mt-1 mb-1`}>
				<span className="mr-2">{data.price}</span>
				<CurrencyIcon type="primary" />
			</p>
			<p className="text text_type_main-default">{data.name}</p>
		</div>
	);
}

BurgerIngredient.propTypes = {
	data: PropTypes.shape(BurgerIngredientType).isRequired,
}

export default BurgerIngredient;