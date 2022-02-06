import {
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useResetPasswordMutation } from "../../../services/api/auth-api";
import { forgotPassword } from "../../../services/reducers/auth-slice";
import { getAccessToken } from "../../../utils/func";
import { LOGIN_URL, RESET_PASSWORD_URL } from "../../../utils/url";
import styles from "./forgot-password-page.module.css";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const history = useHistory();
	const dispatch = useDispatch();
	const { user } = useSelector((s) => s.auth);
	const [errorReset, setErrorReset] = useState(null);
	const [resetPasswordQuery] = useResetPasswordMutation();

	if (user || getAccessToken()) history.push("/");

	const onSubmitHandler = (e) => {
		e.preventDefault();
		resetPasswordQuery({ email }).then((res) => {
			if (res.error) setErrorReset(res.error.data.message);
			else {
				dispatch(forgotPassword());
				history.push(RESET_PASSWORD_URL);
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
					type={"email"}
					placeholder={"Укажите e-mail"}
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					name={"email"}
					error={false}
					errorText={"Ошибка"}
					size={"default"}
				/>
			</div>

			{errorReset && (
				<span className={styles.errorMsg}>{errorReset}</span>
			)}

			<div className="mt-6 mb-20">
				<Button type="primary" size="medium" className="mt-5">
					Восстановить
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

export default ForgotPasswordPage;
