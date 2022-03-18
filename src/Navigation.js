import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import Layout from './Layout';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Professor from './pages/Cadastro/Professor';
import Aluno from './pages/Cadastro/Aluno';
import Atividade from './pages/Atividades/Atividade';
import Calendario from './pages/Calendario/Calendario';

function Navigation() {
	return (
		<Router>
			<Switch>
				{/* <Layout> */}
				<Route path='/atividades' component={Atividade} />
				<Route path='/calendario' component={Calendario} />
				<Route path='/login' component={Login} />
				<Route path='/cadastro/professor' component={Professor} />
				<Route path='/cadastro/aluno' component={Aluno} />
				<Route path='/' component={Home} />
				{/* </Layout> */}
			</Switch>
		</Router>
	);
}

export default Navigation;
