import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import styles from './burger-ingredients.module.css';
import BurgerTypeIngredients from './components/burger-type-ingredients/burger-type-ingredients';
import { useGetIngredientsQuery } from '../../services/api/ingredients-api';
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/spinner';
import { BUN, SAUCE, MAIN } from '../../utils/ingredientTypes';

function BurgerIngredients() {
  const [current, setCurrent] = useState(BUN);
  const { error, isLoading } = useGetIngredientsQuery(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);

  const getRefTop = (ref: React.MutableRefObject<HTMLHeadingElement | null>) =>
    ref.current?.getBoundingClientRect().top;

  const getOffset = (
    r1: React.MutableRefObject<HTMLHeadingElement | null>,
    r2: React.MutableRefObject<HTMLHeadingElement | null>
  ): number => {
    const top1 = getRefTop(r1);
    const top2 = getRefTop(r2);
    return top1 && top2 ? Math.abs(top1 - top2) : 0;
  };

  const handleScroll = () => {
    const bunOffset = getOffset(bunRef, containerRef);
    const sauceOffset = getOffset(sauceRef, containerRef);
    const mainOffset = getOffset(mainRef, containerRef);
    const minOffset = Math.min(bunOffset, sauceOffset, mainOffset);

    if (minOffset === bunOffset) setCurrent(BUN);
    else if (minOffset === sauceOffset) setCurrent(SAUCE);
    else if (minOffset === mainOffset) setCurrent(MAIN);
  };

  const tabClickHandler = (currentTab: string) => {
    setCurrent(currentTab);

    let ref = bunRef;
    if (currentTab === SAUCE) ref = sauceRef;
    else if (currentTab === MAIN) ref = mainRef;
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`${styles.wrap} pt-10`}>
      <h2 className="text text_type_main-large">Соберите бургер</h2>

      <div className={`${styles.tab} mt-5 mb-10`}>
        <Tab value={BUN} active={current === BUN} onClick={tabClickHandler}>
          Булки
        </Tab>
        <Tab value={SAUCE} active={current === SAUCE} onClick={tabClickHandler}>
          Соусы
        </Tab>
        <Tab value={MAIN} active={current === MAIN} onClick={tabClickHandler}>
          Начинки
        </Tab>
      </div>

      {error && <ErrorIndicator />}
      {isLoading && <Spinner />}
      {!error && !isLoading && (
        <div
          className={`${styles.ingredients} custom-scroll`}
          onScroll={handleScroll}
          ref={containerRef}
        >
          <BurgerTypeIngredients name="Булки" type={BUN} ref={bunRef} />
          <BurgerTypeIngredients name="Соусы" type={SAUCE} ref={sauceRef} />
          <BurgerTypeIngredients name="Начинка" type={MAIN} ref={mainRef} />
        </div>
      )}
    </section>
  );
}

export default BurgerIngredients;
