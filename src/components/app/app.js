import { useEffect, useState } from "react";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import ErrorBoundary from "../error-boundary/error-boundary";
import IngredientService from "../../services/ingredient-service";
import ErrorIndicator from "../error-indicator/error-indicator";

const App = () => {
    const [data, setData] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const service = new IngredientService();
        let isSubscribed = true;

        service
            .getAll()
            .then((res) => {
                if (isSubscribed) {
                    setData(res.data);
                }
            })
            .catch(() => {
                setHasError(true);
            });
        return () => (isSubscribed = false);
    }, []);

    return (
        <>
            <AppHeader />
            <ErrorBoundary>
                {hasError && <ErrorIndicator />}
                {data && (
                    <main className={styles.main}>
                        <BurgerIngredients data={data} />
                        <BurgerConstructor data={data} />
                    </main>
                )}
            </ErrorBoundary>
        </>
    );
};

export default App;
