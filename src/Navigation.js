import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Home from './pages/Home/Home';
import Atividade from './pages/Atividades/Atividade';
import Calendario from './pages/Calendario/Calendario';

function Navigation() {
	const user = useSelector(({ user }) => user);
	return (
		<Router>
			{
				user ? (
					<Switch>
						<Route path='/' component={Home} />
						<Route path="/atividades" component={Atividade} />
						<Route path="/calendario" component={Calendario} />
					</Switch>
				) : (
					<Switch>
						<Route path='/' component={Login} />
						<Route path='/login' component={Login} />
						<Route path='/cadastro' component={Cadastro} />
					</Switch>
				)
			}
		</Router>
	);
}

export default Navigation;