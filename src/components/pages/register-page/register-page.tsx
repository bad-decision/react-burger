import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useRegisterMutation } from '../../../services/api/auth-api';
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { registerUser } from '../../../services/reducers/auth-slice';
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from '../../../utils/func';
import { LOGIN_URL } from '../../../utils/url';
import styles from './register-page.module.css';

function RegisterPage() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorRegister, setErrorRegister] = useState(null);
  const { user } = useAppSelector((s) => s.auth);
  const [registerQuery] = useRegisterMutation();

  if (user || getAccessToken()) history.push('/');

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    registerQuery({ name, email, password })
      .then((res) => {
        if (res.error) setErrorRegister(res.error.data.message);
        else {
          const { user: resUser, accessToken, refreshToken } = res.data;
          dispatch(registerUser(resUser));
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          history.push('/');
        }
      })
      .catch();
  };

  return (
    <form className={styles.wrap} onSubmit={(e) => onSubmitHandler(e)}>
      <h3 className="text text_type_main-medium">Регистрация</h3>

      <div className="mt-6">
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          error={false}
          errorText="Ошибка"
        />
      </div>

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

      {errorRegister && (
        <span className={styles.errorMsg}>{errorRegister}</span>
      )}

      <div className="mt-6 mb-20">
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </div>

      <span className="mb-4">
        <span className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </span>{' '}
        <Link
          to={LOGIN_URL}
          className={`text text_type_main-default ${styles.link}`}
        >
          Войти
        </Link>
      </span>
    </form>
  );
}

export default RegisterPage;
