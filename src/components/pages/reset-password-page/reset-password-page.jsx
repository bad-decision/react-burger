import {
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useResetPasswordResetMutation } from "../../../services/api/auth-api";
import { resetPassword } from "../../../services/reducers/auth-slice";
import { getAccessToken } from "../../../utils/func";
import { LOGIN_URL } from "../../../utils/url";
import styles from "./reset-password-page.module.css";

const ResetPasswordPage = () => {
	const [emailCode, setEmailCode] = useState("");
	const [password, setPassword] = useState("");
	const [errorReset, setErrorReset] = useState(null);

	const passwordRef = useRef(null);
	const { user, forgotPassword } = useSelector((s) => s.auth);

	const dispatch = useDispatch();
	const history = useHistory();
	const [resetPasswordQuery] = useResetPasswordResetMutation();

	if (user || getAccessToken() || !forgotPassword) history.push("/");

	const onShowPasswordClick = () => {
		passwordRef.current.type =
			passwordRef.current.type === "password" ? "text" : "password";
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		resetPasswordQuery({ password, token: emailCode }).then((res) => {
			if (res.error) setErrorReset(res.error.data.message);
			else {
				dispatch(resetPassword());
				history.push(LOGIN_URL);
			}
		});
	};

	return (
		<form className={styles.wrap} onSubmit={(e) => onSubmitHandler(e)}>
			<h3 className="text text_type_main-medium">
				Восстановление пароля
			</h3>

			<div className="mt-6">
				<Input
					type={"password"}
					placeholder={"Введите новый пароль"}
					onChange={(e) => setPassword(e.target.value)}
					icon="ShowIcon"
					value={password}
					name={"name"}
					error={false}
					ref={passwordRef}
					onIconClick={onShowPasswordClick}
					errorText={"Ошибка"}
				/>
			</div>

			<div className="mt-6">
				<Input
					type={"text"}
					placeholder={"Введите код из письма"}
					onChange={(e) => setEmailCode(e.target.value)}
					value={emailCode}
					name={"code"}
					error={false}
					errorText={"Ошибка"}
				/>
			</div>

			{errorReset && (
				<span className={styles.errorMsg}>{errorReset}</span>
			)}

			<div className="mt-6 mb-20">
				<Button type="primary" size="medium" className="mt-5">
					Сохранить
				</Button>
			</div>

			<span className="mb-4">
				<span className="text text_type_main-default text_color_inactive">
					Вспомнили пароль?
				</span>{" "}
				<Link
					to={LOGIN_URL}
					className={`text text_type_main-default ${styles.link}`}
				>
					Войти
				</Link>
			</span>
		</form>
	);
};

export default ResetPasswordPage;
