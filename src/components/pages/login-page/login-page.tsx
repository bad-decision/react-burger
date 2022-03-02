import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useLoginMutation } from '../../../services/api/auth-api';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { logInUser } from '../../../services/reducers/auth-slice';
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from '../../../utils/func';
import { FORGOT_PASSWORD_URL, REGISTER_URL } from '../../../utils/url';
import styles from './login-page.module.css';

function LoginPage() {
  const dispatch = useAppDispatch();
  const { state } = useLocation();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [loginQuery] = useLoginMutation();
  const { user } = useAppSelector((s) => s.auth);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginQuery({ email, password })
      .then((res) => {
        const { user: resUser, accessToken, refreshToken } = res.data;
        dispatch(logInUser(resUser));
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
      })
      .catch();
  };

  if (user || getAccessToken()) {
    return <Redirect to={state?.from || '/'} />;
  }

  return (
    <form className={styles.wrap} onSubmit={(e) => onSubmitHandler(e)}>
      <h3 className="text text_type_main-medium">Вход</h3>
      <div className="mt-6 mb-6">
        <Input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          error={false}
          errorText="Ошибка"
        />
      </div>

      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name="password"
      />

      <div className="mt-6 mb-20">
        <Button type="primary" size="medium">
          Войти
        </Button>
      </div>

      <span className="mb-4">
        <span className="text text_type_main-default text_color_inactive">
          Вы - новый пользователь?
        </span>{' '}
        <Link
          to={REGISTER_URL}
          className={`text text_type_main-default ${styles.link}`}
        >
          Зарегистрироваться
        </Link>
      </span>
      <span>
        <span className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </span>{' '}
        <Link
          to={FORGOT_PASSWORD_URL}
          className={`text text_type_main-default ${styles.link}`}
        >
          Восстановить пароль
        </Link>
      </span>
    </form>
  );
}

export default LoginPage;
