import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./app-header.module.css";

const AppHeader = () => {
    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <nav className={styles.nav}>
                <div className={`${styles.constructor} p-5 mr-2`}>
                    <BurgerIcon type="primary" />
                    <span className="text text_type_main-default ml-2">Конструктор</span>
                </div>

                <div className={`${styles.orders} p-5`}>
                    <ListIcon type="secondary" />
                    <span className="text text_type_main-default text_color_inactive ml-2">
                        Лента заказов
                    </span>
                </div>
            </nav>

            <div className={styles.logo}>
                <Logo />
            </div>

            <div className={`${styles.lk} p-5`}>
                <ProfileIcon type="secondary" />
                <span className="text text_type_main-default text_color_inactive ml-2">
                    Личный кабинет
                </span>
            </div>
        </header>
    );
};

export default AppHeader;
