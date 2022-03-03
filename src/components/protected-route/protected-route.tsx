import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { useGetUserQuery } from '../../services/api/auth-api';
import { getUser } from '../../services/reducers/auth-slice';
import { LOGIN_URL } from '../../utils/url';
import { getAccessToken } from '../../utils/func';
import { useAppSelector } from '../../services/hooks';

interface IProps {
  children: React.ReactNode;
  path: string;
}

function ProtectedRoute({ children, ...rest }: IProps) {
  const dispatch = useDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const accessToken = getAccessToken();

  const { data, isLoading } = useGetUserQuery(null, {
    skip: user !== null || !accessToken,
  });

  useEffect(() => {
    if (data?.user) dispatch(getUser(data.user));
  }, [data, dispatch]);

  if (isLoading) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user || data ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: LOGIN_URL,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
