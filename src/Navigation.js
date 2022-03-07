import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Home from './pages/Home/Home';
import Atividade from './pages/Atividades/Atividade';
import Calendario from './pages/Calendario/Calendario';

function Navigation() {
	return (
		<Router>
			<Switch>
			<Route path="/atividades" component={Atividade} />
        	<Route path="/calendario" component={Calendario} />
				<Route path='/login' component={Login} />
				<Route path='/cadastro' component={Cadastro} />
				<Route path='/' component={Home} />
			</Switch>
		</Router>
	);
}

export default Navigation;
