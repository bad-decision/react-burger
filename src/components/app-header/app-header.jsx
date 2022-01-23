import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

const AppHeader = () => {
    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <nav className={styles.nav}>
                <a className={`${styles.constructor} p-5 mr-2`} href="/">
                    <BurgerIcon type="primary" />
                    <span className="text text_type_main-default ml-2">
                        Конструктор
                    </span>
                </a>

                <a className={`${styles.orders} p-5`} href="/">
                    <ListIcon type="secondary" />
                    <span className="text text_type_main-default text_color_inactive ml-2">
                        Лента заказов
                    </span>
                </a>
            </nav>

            <div className={styles.logo}>
                <Logo />
            </div>

            <a className={`${styles.lk} p-5`} href="/">
                <ProfileIcon type="secondary" />
                <span className="text text_type_main-default text_color_inactive ml-2">
                    Личный кабинет
                </span>
            </a>
        </header>
    );
};

export default AppHeader;
