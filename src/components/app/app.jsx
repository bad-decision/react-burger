import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
	CONSTRUCTOR_URL,
	FORGOT_PASSWORD_URL,
	INGREDIENT_DETAIL_URL,
	LOGIN_URL,
	PROFILE_URL,
	REGISTER_URL,
	RESET_PASSWORD_URL,
} from "../../utils/url";

import AppHeader from "../app-header/app-header";
import ErrorBoundary from "../error-boundary/error-boundary";
import ForgotPasswordPage from "../pages/forgot-password-page/forgot-password-page";
import IngredientDetailsPage from "../pages/ingredient-details-page/ingredient-details-page";
import LoginPage from "../pages/login-page/login-page";
import MainPage from "../pages/main-page/main-page";
import NoFoundPage from "../pages/no-found-page/no-found-page";
import ProfilePage from "../pages/profile-page/profile-page";
import RegisterPage from "../pages/register-page/register-page";
import ResetPasswordPage from "../pages/reset-password-page/reset-password-page";
import ProtectedRoute from "../protected-route/protected-route";

const App = () => {
	return (
		<Router>
			<AppHeader />
			<ErrorBoundary>
				<DndProvider backend={HTML5Backend}>
					<Switch>
						<Route path={CONSTRUCTOR_URL} exact={true}>
							<MainPage />
						</Route>
						<Route path={LOGIN_URL} exact={true}>
							<LoginPage />
						</Route>
						<Route path={REGISTER_URL} exact={true}>
							<RegisterPage />
						</Route>
						<Route path={FORGOT_PASSWORD_URL} exact={true}>
							<ForgotPasswordPage />
						</Route>
						<Route path={RESET_PASSWORD_URL} exact={true}>
							<ResetPasswordPage />
						</Route>
						<ProtectedRoute path={PROFILE_URL}>
							<ProfilePage />
						</ProtectedRoute>
						<Route path={INGREDIENT_DETAIL_URL} exact={true}>
							<IngredientDetailsPage />
						</Route>
						<Route>
							<NoFoundPage />
						</Route>
					</Switch>
				</DndProvider>
			</ErrorBoundary>
		</Router>
	);
};

export default App;
