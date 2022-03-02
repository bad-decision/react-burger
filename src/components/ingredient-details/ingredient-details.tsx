import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetIngredientsQuery } from '../../services/api/ingredients-api';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { setIngredientDetails } from '../../services/reducers/ingredients-slice';
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/spinner';
import Value from './components/value/value';
import styles from './ingredient-details.module.css';

function IngredientDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { data: ingredients, error, isLoading } = useGetIngredientsQuery(null);

  useEffect(() => {
    const ingredient = ingredients?.find((x) => x._id === id);
    if (ingredient) dispatch(setIngredientDetails(ingredient));
  }, [ingredients, id, dispatch]);

  const { ingredientDetails } = useAppSelector(
    (store) => store.burgerIngredients
  );

  if (error) return <ErrorIndicator />;
  if (isLoading) return <Spinner />;
  if (!ingredientDetails) return null;

  const {
    image_large: imageLarge,
    name,
    calories,
    proteins,
    fat,
    carbohydrates,
  } = ingredientDetails;

  return (
    <div className={`${styles.wrap}`}>
      <img src={imageLarge} alt={name} />
      <h3 className="mt-4 mb-8 text text_type_main-medium">{name}</h3>
      <div className={`${styles.values} mb-15`}>
        <Value name="Калорий, ккал" value={calories} />
        <Value name="Белки, г" value={proteins} />
        <Value name="Жиры, г" value={fat} />
        <Value name="Углеводы, г" value={carbohydrates} />
      </div>
    </div>
  );
}

export default IngredientDetails;
