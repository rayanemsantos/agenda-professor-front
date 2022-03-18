import React from 'react';
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
	return (
		<Router>
			<Switch>
				{/* <Layout> */}
				<Route path='/atividades'>
					<Atividade usuario={usuario} />
				</Route>
				<Route path='/calendario'>
					<Calendario usuario={usuario} />
				</Route>
				<Route path='/login'>
					<Login usuario={usuario} />
				</Route>
				<Route path='/cadastrar-professor'>
					<Professor usuario={usuario} />
				</Route>
				<Route path='/cadastrar-aluno'>
					<Aluno usuario={usuario} />
				</Route>
				<Route path='/'>
					<Home usuario={usuario} />
				</Route>
				{/* </Layout> */}
			</Switch>
		</Router>
	);
}

export default Navigation;
