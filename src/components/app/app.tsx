import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../services/hooks';
import { setIngredientDetails } from '../../services/reducers/ingredients-slice';
import { ILocationModal } from '../../utils/types';
import {
  CONSTRUCTOR_URL,
  FORGOT_PASSWORD_URL,
  INGREDIENT_DETAIL_URL,
  LOGIN_URL,
  PROFILE_URL,
  REGISTER_URL,
  RESET_PASSWORD_URL,
} from '../../utils/url';

import AppHeader from '../app-header/app-header';
import ErrorBoundary from '../error-boundary/error-boundary';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import ForgotPasswordPage from '../pages/forgot-password-page/forgot-password-page';
import IngredientDetailsPage from '../pages/ingredient-details-page/ingredient-details-page';
import LoginPage from '../pages/login-page/login-page';
import MainPage from '../pages/main-page/main-page';
import NoFoundPage from '../pages/no-found-page/no-found-page';
import ProfilePage from '../pages/profile-page/profile-page';
import RegisterPage from '../pages/register-page/register-page';
import ResetPasswordPage from '../pages/reset-password-page/reset-password-page';
import ProtectedRoute from '../protected-route/protected-route';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation<ILocationModal>();
  const history = useHistory();

  const background = location.state && location.state.background;

  const handleModalClose = () => {
    dispatch(setIngredientDetails(null));
    history.goBack();
  };

  return (
    <>
      <AppHeader />
      <ErrorBoundary>
        <DndProvider backend={HTML5Backend}>
          <Switch location={background || location}>
            <Route path={CONSTRUCTOR_URL} exact>
              <MainPage />
            </Route>
            <Route path={LOGIN_URL} exact>
              <LoginPage />
            </Route>
            <Route path={REGISTER_URL} exact>
              <RegisterPage />
            </Route>
            <Route path={FORGOT_PASSWORD_URL} exact>
              <ForgotPasswordPage />
            </Route>
            <Route path={RESET_PASSWORD_URL} exact>
              <ResetPasswordPage />
            </Route>
            <ProtectedRoute path={PROFILE_URL}>
              <ProfilePage />
            </ProtectedRoute>
            <Route path={INGREDIENT_DETAIL_URL} exact>
              <IngredientDetailsPage />
            </Route>
            <Route>
              <NoFoundPage />
            </Route>
          </Switch>

          {background && (
            <Route path={INGREDIENT_DETAIL_URL}>
              <Modal closeModal={handleModalClose} header="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            </Route>
          )}
        </DndProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
