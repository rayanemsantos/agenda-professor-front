import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

function Authorization(props) {
	const { children, location, history } = props;
	const user = useSelector(({ user }) => user);

	useEffect(() => {
		const { pathname, state } = location;
		const redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/';

		if (!user) {
			history.push({
				pathname: '/login',
				state: { redirectUrl: pathname },
			});
		} else {
			history.push({
				pathname: redirectUrl,
			});
		}
	}, [user]);

	return <React.Fragment>{children}</React.Fragment>;
}

export default withRouter(Authorization);
