import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';

import Home from '../views/home';
import Login from '../views/login';
import Register from '../views/register';

const AppRoutes = () => {
	const history = useHistory();

	const [user] = useState(null);

	useEffect(() => {
		if (!user) {
			history.push('/login');
		}
	}, [user, history]);

	return (
		<>
			<Route exact path='/' component={Home} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/register' component={Register} />
		</>
	);
};

export default AppRoutes;
