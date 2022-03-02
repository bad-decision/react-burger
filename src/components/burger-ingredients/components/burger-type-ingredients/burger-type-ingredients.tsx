import React from 'react';
import styles from './burger-type-ingredients.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { ingredientsApi } from '../../../../services/api/ingredients-api';

interface IProps {
  type: string;
  name: string;
}

// eslint-disable-next-line react/display-name
const BurgerTypeIngredients = React.forwardRef<HTMLHeadingElement, IProps>(
  ({ type, name }, ref) => {
    const { data } =
      ingredientsApi.endpoints.getIngredients.useQueryState(null);
    const ingredients = data?.filter((x) => x.type === type);

    return (
      <>
        <h3 className="text text_type_main-medium" ref={ref}>
          {name}
        </h3>
        <div className={`${styles.ingredients} pt-6 pb-10 pl-4`}>
          {ingredients?.map((item) => (
            <BurgerIngredient ingredient={item} key={item._id} />
          ))}
        </div>
      </>
    );
  }
);

export default BurgerTypeIngredients;
