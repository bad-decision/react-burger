import { ORDER_IMAGES_MAX } from '../../../utils/const';
import { IIngredientDetails } from '../../../utils/types';
import styles from './order-images.module.css';

interface IProps {
  ingredients: (IIngredientDetails | undefined)[];
}

function OrderImages({ ingredients }: IProps) {
  const count = ingredients.length;
  const sliceIngredients =
    count > ORDER_IMAGES_MAX
      ? ingredients.slice(0, ORDER_IMAGES_MAX)
      : ingredients;
  const hiddenCount = count > ORDER_IMAGES_MAX ? count - ORDER_IMAGES_MAX : 0;

  return (
    <div className={styles.wrap}>
      {sliceIngredients?.map((ingredient, index) => {
        if (!ingredient) return null;

        const { image_mobile: imageMobile, name } = ingredient || {};
        const hidden = index == sliceIngredients.length - 1 && hiddenCount > 0;
        return (
          <div className={styles.preview} key={index}>
            <img
              className={hidden ? styles.imageHidden : styles.image}
              src={imageMobile}
              alt={name}
            />
            {hidden && (
              <span
                className={`text text_type_main-medium ${styles.hiddenCount}`}
              >
                +{hiddenCount}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default OrderImages;
