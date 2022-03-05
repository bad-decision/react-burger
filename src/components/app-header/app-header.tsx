import { Link, NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { CONSTRUCTOR_URL, PROFILE_URL } from '../../utils/url';

function AppHeader() {
  const { pathname } = useLocation();
  const profileMatch = useRouteMatch(PROFILE_URL);

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <NavLink
          className={`${styles.link} p-5 mr-2`}
          to="/"
          activeClassName={styles.activeLink}
          exact
        >
          <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
          <span className="text text_type_main-default text_color_inactive ml-2">
            Конструктор
          </span>
        </NavLink>

        <NavLink
          className={`${styles.link} p-5`}
          to="/orders"
          exact
          activeClassName={styles.activeLink}
        >
          <ListIcon type={pathname === '/orders' ? 'primary' : 'secondary'} />
          <span className="text text_type_main-default text_color_inactive ml-2">
            Лента заказов
          </span>
        </NavLink>
      </nav>

      <Link className={styles.logo} to={CONSTRUCTOR_URL}>
        <Logo />
      </Link>

      <NavLink
        className={`${styles.profile} p-5`}
        to={PROFILE_URL}
        activeClassName={styles.activeLink}
      >
        <ProfileIcon type={profileMatch ? 'primary' : 'secondary'} />
        <span className="text text_type_main-default text_color_inactive ml-2">
          Личный кабинет
        </span>
      </NavLink>
    </header>
  );
}

export default AppHeader;
