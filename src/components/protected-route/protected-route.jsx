import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useGetUserQuery } from "../../services/api/auth-api";
import { getUser } from "../../services/reducers/auth-slice";
import { LOGIN_URL } from "../../utils/url";
import { getAccessToken } from "../../utils/func";

const ProtectedRoute = ({ children, ...rest }) => {
	const dispatch = useDispatch();
	const { user } = useSelector((s) => s.auth);
	const accessToken = getAccessToken();

	let { data, isLoading } = useGetUserQuery(null, {
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
};

ProtectedRoute.propTypes = {
	children: PropTypes.element.isRequired
};

export default ProtectedRoute;
