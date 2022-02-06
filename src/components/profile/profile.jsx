import {
	Button,
	EmailInput,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../services/api/auth-api";
import { getUser } from "../../services/reducers/auth-slice";
import styles from "./profile.module.css";

const Profile = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((s) => s.auth);
	const [formPassword, setFormPassword] = useState("");
	const [formName, setFormName] = useState("");
	const [formEmail, setFormEmail] = useState("");
	const [updateMsg, setUpdateMsg] = useState(null);

	const [updateUser] = useUpdateUserMutation();

	const passwordRef = useRef(null);
	const nameRef = useRef(null);

	useEffect(() => {
		if (user) {
			setFormName(user.name);
			setFormEmail(user.email);
		}
	}, [user]);

	const onIconClick = (ref) => {
		ref.current.focus();
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const options = {
			name: formName,
			email: formEmail,
			password: formPassword,
		};
		updateUser(options).then((res) => {
			if (res.data?.success) {
				dispatch(getUser(res.data.user));
				setUpdateMsg("Данные успешно обновлены");
				setFormPassword("");
			} else setUpdateMsg("Данные успешно не обновлены");
		});
	};

	const resetProfile = (e) => {
		e.preventDefault();
		setFormPassword("");
		setFormName(user.name);
		setFormEmail(user.email);
	};

	return (
		user && (
			<form
				className={styles.profileWrap}
				onSubmit={(e) => onSubmitHandler(e)}
			>
				<div>
					<Input
						type={"text"}
						placeholder={"Имя"}
						onChange={(e) => setFormName(e.target.value)}
						value={formName}
						name={"name"}
						icon="EditIcon"
						error={false}
						ref={nameRef}
						onIconClick={() => onIconClick(nameRef)}
						errorText={"Ошибка"}
						size={"default"}
					/>
				</div>

				<div className="mt-6 mb-6">
					<EmailInput
						onChange={(e) => setFormEmail(e.target.value)}
						value={formEmail}
						name={"email"}
					/>
				</div>

				<Input
					type={"password"}
					placeholder={"Пароль"}
					onChange={(e) => setFormPassword(e.target.value)}
					icon="EditIcon"
					value={formPassword}
					name={"password"}
					error={false}
					ref={passwordRef}
					onIconClick={() => onIconClick(passwordRef)}
					errorText={"Ошибка"}
				/>

				{updateMsg && <span>{updateMsg}</span>}

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
			</form>
		)
	);
};

export default Profile;
