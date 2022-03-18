import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import Layout from './Layout';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Professor from './pages/Cadastro/Professor';
import Aluno from './pages/Cadastro/Aluno';
import Atividade from './pages/Atividades/Atividade';
import Calendario from './pages/Calendario/Calendario';

// RAY: deixei 'pronto' pra receber os perfis 'professor' e 'secretaria'. Só dar um CTRL + SHIFT + F em 'usuario' e botar o obj
let usuario = 'secretaria';
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
						<Route path='/cadastrar-professor' component={Professor}/>
						<Route path='/cadastrar-aluno' component={Aluno}/>
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