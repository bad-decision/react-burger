import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-ingredients.module.css';
import BurgerTypeIngredients from '../burger-type-ingredients/burger-type-ingredients';
import PropTypes from 'prop-types';

const BurgerIngredients = ({ data }) => {

	const [current, setCurrent] = React.useState('one')

	const buns = data.filter(x => x.type === 'bun');
	const sauces = data.filter(x => x.type === 'sauce');
	const mains = data.filter(x => x.type === 'main');

	return (
		<section className={`${styles.wrap} pt-10`}>

			<h2 className="text text_type_main-large">
				Соберите бургер
			</h2>

			<div className={`${styles.tab} mt-5 mb-10`}>
				<Tab value="one" active={current === 'one'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value="two" active={current === 'two'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value="three" active={current === 'three'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>

			<div className={`${styles.ingredients} custom-scroll`}>
				<BurgerTypeIngredients name="Булки" data={buns} />
				<BurgerTypeIngredients name="Соусы" data={sauces} />
				<BurgerTypeIngredients name="Начинка" data={mains} />
			</div>

		</section>
	);
}

BurgerIngredients.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		type: PropTypes.string.isRequired
	})).isRequired,
}

export default BurgerIngredients;