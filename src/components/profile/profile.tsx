import {
  Button,
  EmailInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {
  FormEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useUpdateUserMutation } from '../../services/api/auth-api';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { getUser } from '../../services/reducers/auth-slice';
import styles from './profile.module.css';

function Profile() {
  const initPassword = '';
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const [formPassword, setFormPassword] = useState(initPassword);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);
  const [isChanged, setIsChanged] = useState(false);

  const [updateUser] = useUpdateUserMutation();

  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFormName(user.name);
      setFormEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setIsChanged(
        formName !== user.name ||
          formEmail !== user.email ||
          formPassword !== initPassword
      );
    }
  }, [formName, formEmail, formPassword, user]);

  const onIconClick = (
    ref: React.MutableRefObject<HTMLInputElement | null>
  ) => {
    if (ref.current !== null) ref.current.focus();
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options = {
      name: formName,
      email: formEmail,
      password: formPassword,
    };
    updateUser(options)
      .then((res) => {
        if ('data' in res) {
          const data = res.data;
          if (data && data.user) {
            dispatch(getUser(data.user));
            setUpdateMsg('Данные успешно обновлены');
            setFormPassword('');
          } else setUpdateMsg('Данные успешно не обновлены');
        }
      })
      .catch();
  };

  const resetProfile = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    setFormPassword(initPassword);
    if (user !== null) {
      setFormName(user.name);
      setFormEmail(user.email);
    }
    setIsChanged(false);
  };

  return (
    user && (
      <form className={styles.profileWrap} onSubmit={(e) => onSubmitHandler(e)}>
        <div>
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) => setFormName(e.target.value)}
            value={formName}
            name="name"
            icon="EditIcon"
            error={false}
            ref={nameRef}
            onIconClick={() => onIconClick(nameRef)}
            errorText="Ошибка"
            size="default"
          />
        </div>

        <div className="mt-6 mb-6">
          <EmailInput
            onChange={(e) => setFormEmail(e.target.value)}
            value={formEmail}
            name="email"
          />
        </div>

        <Input
          type="password"
          placeholder="Пароль"
          onChange={(e) => setFormPassword(e.target.value)}
          icon="EditIcon"
          value={formPassword}
          name="password"
          error={false}
          ref={passwordRef}
          onIconClick={() => onIconClick(passwordRef)}
          errorText="Ошибка"
        />

        {updateMsg && <span>{updateMsg}</span>}

        {isChanged && (
          <div className={styles.buttons}>
            <Button
              type="secondary"
              size="medium"
              onClick={(e) => resetProfile(e)}
            >
              Отменить
            </Button>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    )
  );
}

export default Profile;
