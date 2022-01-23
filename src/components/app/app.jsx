import { useEffect, useState } from "react";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import ErrorBoundary from "../error-boundary/error-boundary";
import ErrorIndicator from "../error-indicator/error-indicator";
import { BurgerConstructorContext } from "../../services/burger-constructor-context";
import ingredientService from "../../services/ingredient-service";

const App = () => {
    const [data, setData] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [constructorData, setConstructorData] = useState(null);

    useEffect(() => {
        ingredientService
            .getAll()
            .then((res) => {
                setConstructorData({
                    bun: res.data.filter((x) => x.type === "bun")[0],
                    insideItems: res.data.filter((x) => x.type !== "bun")
                });
                setData(res.data);
            })
            .catch(() => {
                setHasError(true);
            });
    }, []);

    return (
        <>
            <AppHeader />
            <ErrorBoundary>
                {hasError && <ErrorIndicator />}
                {data && (
                    <main className={styles.main}>
                        <BurgerIngredients data={data} />
                        <BurgerConstructorContext.Provider value={constructorData}>
                            <BurgerConstructor />
                        </BurgerConstructorContext.Provider>
                    </main>
                )}
            </ErrorBoundary>
        </>
    );
};

export default App;
