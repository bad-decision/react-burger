import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import BurgerTypeIngredients from "./components/burger-type-ingredients/burger-type-ingredients";
import { useGetIngredientsQuery } from "../../services/api/ingredients-api";
import ErrorIndicator from "../error-indicator/error-indicator";
import Spinner from "../spinner/spinner";
import { BUN, SAUCE, MAIN } from "../../utils/ingredientTypes";

const BurgerIngredients = () => {
	const [current, setCurrent] = useState(BUN);
	const { error, isLoading } = useGetIngredientsQuery();

	const containerRef = useRef(null);
	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);

	const getRefTop = (ref) => ref.current.getBoundingClientRect().top;
	const getOffset = (r1, r2) => Math.abs(getRefTop(r1) - getRefTop(r2));

	const handleScroll = () => {
		const bunOffset = getOffset(bunRef, containerRef);
		const sauceOffset = getOffset(sauceRef, containerRef);
		const mainOffset = getOffset(mainRef, containerRef);
		const minOffset = Math.min(bunOffset, sauceOffset, mainOffset);

		if (minOffset === bunOffset) setCurrent(BUN);
		else if (minOffset === sauceOffset) setCurrent(SAUCE);
		else if (minOffset === mainOffset) setCurrent(MAIN);
	};

	return (
		<section className={`${styles.wrap} pt-10`}>
			<h2 className="text text_type_main-large">Соберите бургер</h2>

			<div className={`${styles.tab} mt-5 mb-10`}>
				<Tab value={BUN} active={current === BUN} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab
					value={SAUCE}
					active={current === SAUCE}
					onClick={setCurrent}
				>
					Соусы
				</Tab>
				<Tab
					value={MAIN}
					active={current === MAIN}
					onClick={setCurrent}
				>
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
					<BurgerTypeIngredients
						name="Булки"
						type={BUN}
						ref={bunRef}
					/>
					<BurgerTypeIngredients
						name="Соусы"
						type={SAUCE}
						ref={sauceRef}
					/>
					<BurgerTypeIngredients
						name="Начинка"
						type={MAIN}
						ref={mainRef}
					/>
				</div>
			)}
		</section>
	);
};

export default BurgerIngredients;
