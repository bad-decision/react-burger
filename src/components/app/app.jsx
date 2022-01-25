import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
				<DndProvider backend={HTML5Backend}>
					<main className={styles.main}>
						<BurgerIngredients />
						<BurgerConstructor />
					</main>
				</DndProvider>
			</ErrorBoundary>
		</>
	);
};

export default App;
