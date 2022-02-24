import { useDispatch } from 'react-redux';
import { Link, useHistory, Switch, Route, NavLink } from 'react-router-dom';
import { useLogoutMutation } from '../../../services/api/auth-api';
import { logOutUser } from '../../../services/reducers/auth-slice';
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from '../../../utils/func';
import {
  LOGIN_URL,
  PROFILE_URL,
  PROFILE_ORDERS_URL,
  CONSTRUCTOR_URL,
} from '../../../utils/url';

import Profile from '../../profile/profile';
import styles from './profile-page.module.css';

function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [logOutQuery] = useLogoutMutation();

  const logOutHandler = (e) => {
    e.preventDefault();
    const payload = { token: getRefreshToken() };
    logOutQuery(payload)
      .then(() => {
        removeAccessToken();
        removeRefreshToken();
        dispatch(logOutUser());
        history.push(LOGIN_URL);
      })
      .catch();
  };

  return (
    <div className={styles.container}>
      <div className={styles.linksArea}>
        <div className={styles.linksWrap}>
          <NavLink
            activeClassName={styles.activeLink}
            to={PROFILE_URL}
            exact
            className={`text text_type_main-medium text_color_inactive ${styles.navLink}`}
          >
            Профиль
          </NavLink>
          <NavLink
            activeClassName={styles.activeLink}
            to={PROFILE_ORDERS_URL}
            exact
            className={`text text_type_main-medium text_color_inactive ${styles.navLink}`}
          >
            История заказов
          </NavLink>
          <Link
            onClick={(e) => logOutHandler(e)}
            to={CONSTRUCTOR_URL}
            className={`text text_type_main-medium text_color_inactive mb-20 ${styles.logOutLink}`}
          >
            Выход
          </Link>
          <span className="text text_type_main-small text_color_inactive">
            В этом разделе вы можете <br /> изменить свои персональные данные
          </span>
        </div>
      </div>
      <Switch>
        <Route path={PROFILE_URL} exact>
          <Profile />
        </Route>
        <Route path={PROFILE_ORDERS_URL} exact />
      </Switch>
    </div>
  );
}

export default ProfilePage;
