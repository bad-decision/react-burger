import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

const BurgerContstructor = ({ data }) => {
	const bun = data.filter(x => x.type === 'bun')[0];
	const inside = data.filter(x => x.type !== 'bun');

	return (
		<section className={`${styles.section} pt-25 pl-4 pr-4`}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className='mb-10'>
				<div className='pl-8'>
					<ConstructorElement
						type="top"
						isLocked={true}
						text={bun.name}
						price={bun.price}
						thumbnail={bun.image_mobile}
					/>
				</div>

				<div className={`${styles.items} custom-scroll`}>
					{inside.map(item => {
						return (
							<div className={styles.item} key={item._id}>
								<DragIcon type="primary" />
								<ConstructorElement
									text={item.name}
									price={item.price}
									thumbnail={item.image_mobile}
								/>
							</div>
						);
					})}
				</div>
				<div className='pl-8'>
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={bun.name}
						price={bun.price}
						thumbnail={bun.image_mobile}
					/>
				</div>
			</div>

			<div className={styles.order}>
				<span className='text text_type_digits-medium mr-10'>610 <CurrencyIcon type="primary" /></span>

				<Button type="primary" size="large">
					Оформить заказ
				</Button>
			</div>
		</section>
	);
}

BurgerContstructor.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		image_mobile: PropTypes.string.isRequired,
	})).isRequired,
}

export default BurgerContstructor;