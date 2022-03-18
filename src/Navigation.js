import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Professor from './pages/Cadastro/Professor';
import Aluno from './pages/Cadastro/Aluno';
import Atividade from './pages/Atividades/Atividade';
import Calendario from './pages/Calendario/Calendario';

function Navigation() {
	const user = useSelector(({ user }) => user);
	return (
		<div className='App'>
		<Router>
			{
				user ? (
					<Switch>
						<Route path='/home' exact component={Home} />
						<Route path="/atividades" exact component={Atividade} />
						<Route path="/calendario" exact component={Calendario} />
						<Route path='/cadastrar-professor' exact component={Professor}/>
						<Route path='/cadastrar-aluno' exact component={Aluno}/>
						<Route path='/' exact component={Home} />
					</Switch>
				) : (
					<Switch>
						<Route path='/' exact component={Login} />
						<Route path='/login' exact component={Login} />
					</Switch>
				)
			}
		</Router>
		</div>
	);
}

export default Navigation;