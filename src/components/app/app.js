import React from "react";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import data from '../../utils/data';

const App = () => {
	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients data={data} />
				<BurgerConstructor data={data} />
			</main>
		</>
	);
};

export default App;
