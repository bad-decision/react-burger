import BurgerConstructor from "../../burger-constructor/burger-constructor";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import styles from "./main-page.module.css";

const MainPage = () => {
	return (
		<main className={styles.main}>
			<BurgerIngredients />
			<BurgerConstructor />
		</main>
	);
};

export default MainPage;
