import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredientDetails } from '../../../../utils/types';
import styles from './order-ingredient.module.css';

interface IProps {
  count: number | undefined;
  ingredient: IIngredientDetails | undefined;
}

function OrderIngredient({ count, ingredient }: IProps) {
  if (!ingredient) return null;
  const { price, image_mobile: imageMobile, name } = ingredient;
  return (
    <div className={`${styles.wrap} mr-6`}>
      <div className={styles.imageName}>
        <div className={styles.preview}>
          <img className={styles.image} src={imageMobile} alt={name} />
        </div>
        <p className="text text_type_main-small ml-6">{name}</p>
      </div>

      <p className={`${styles.price} text text_type_digits-default`}>
        <span className="mr-2">
          {count} х {price}
        </span>
        <CurrencyIcon type="primary" />
      </p>
    </div>
  );
}

export default OrderIngredient;
