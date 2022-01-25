import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import ErrorBoundary from "../error-boundary/error-boundary";

const App = () => {
	return (
		<>
			<AppHeader />
			<ErrorBoundary>
				<main className={styles.main}>
					<BurgerIngredients />
					<BurgerConstructor />
				</main>
			</ErrorBoundary>
		</>
	);
};

export default App;
