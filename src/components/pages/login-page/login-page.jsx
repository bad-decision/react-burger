import {
	Button,
	Input,
	PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useLoginMutation } from "../../../services/api/auth-api";
import { logInUser } from "../../../services/reducers/auth-slice";
import {
	getAccessToken,
	setAccessToken,
	setRefreshToken,
} from "../../../utils/func";
import { FORGOT_PASSWORD_URL, REGISTER_URL } from "../../../utils/url";
import styles from "./login-page.module.css";

const LoginPage = () => {
	const dispatch = useDispatch();
	const { state } = useLocation();

	const [password, setPassword] = useState("");
	const [errorLogIn, setErrorLogIn] = useState(null);
	const [email, setEmail] = useState("");

	const [loginQuery] = useLoginMutation();
	const { user } = useSelector((s) => s.auth);

	const onSubmitHandler = (e) => {
		e.preventDefault();

		loginQuery({ email, password }).then((res) => {
			if (res.error) setErrorLogIn(res.error.data.message);
			else {
				const { user, accessToken, refreshToken } = res.data;
				dispatch(logInUser(user));
				setAccessToken(accessToken);
				setRefreshToken(refreshToken);
			}
		});
	};

	if (user || getAccessToken()) {
		return <Redirect to={state?.from || "/"} />;
	}

	return (
		<form className={styles.wrap} onSubmit={(e) => onSubmitHandler(e)}>
			<h3 className="text text_type_main-medium">Вход</h3>
			<div className="mt-6 mb-6">
				<Input
					type={"email"}
					placeholder={"E-mail"}
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					name={"email"}
					error={false}
					errorText={"Ошибка"}
				/>
			</div>

			<PasswordInput
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				name={"password"}
			/>

			{errorLogIn && (
				<span className={styles.errorMsg}>{errorLogIn}</span>
			)}

			<div className="mt-6 mb-20">
				<Button type="primary" size="medium" className="mt-5">
					Войти
				</Button>
			</div>

			<span className="mb-4">
				<span className="text text_type_main-default text_color_inactive">
					Вы - новый пользователь?
				</span>{" "}
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
				</span>{" "}
				<Link
					to={FORGOT_PASSWORD_URL}
					className={`text text_type_main-default ${styles.link}`}
				>
					Восстановить пароль
				</Link>
			</span>
		</form>
	);
};

export default LoginPage;
