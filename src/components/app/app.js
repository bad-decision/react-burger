import { useEffect, useState } from "react";

import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import ErrorBoundary from "../error-boundary/error-boundary";
import IngredientService from "../../services/ingredient-service";
import ErrorIndicator from "../error-indicator/error-indicator";
import { BurgerConstructorContext } from "../../services/burger-constructor-context";

const App = () => {
    const [data, setData] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [constructorData, setConstructorData] = useState(null);

    useEffect(() => {
        const service = new IngredientService();
        service
            .getAll()
            .then((res) => {
                setConstructorData({
                    bun: res.data.filter((x) => x.type === "bun")[0],
                    inside: res.data.filter((x) => x.type !== "bun")
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
