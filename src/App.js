import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import * as history from 'history';

import Theme from './Theme';
import Layout from './Layout';
import Navigation from './Navigation';
import Authorization from './Authorization';
import AppContext from './AppContext';

import Login from './pages/Login/Login';
import AlunoList from './pages/aluno/AlunoList';
import AlunoNew from './pages/aluno/AlunoNew';
import TurmaList from './pages/turma/TurmaList';
import TurmaNew from './pages/turma/TurmaNew';
import Home from './pages/Home/Home';

import { store } from './store';

const hist = history.createBrowserHistory();

const routes = [
	{
		path: '/',
		exact: true,
		component: Home,
	},
	{
		path: '/login',
		exact: true,
		component: Login,
	},
	{
		path: '/alunos',
		exact: true,
		component: AlunoList,
	},
	{
		path: '/aluno/:id',
		exact: true,
		component: AlunoNew,
	},
	{
		path: '/turmas',
		exact: true,
		component: TurmaList,
	},
	{
		path: '/turma/:id',
		exact: true,
		component: TurmaNew,
	},
];

export default function App() {
	return (
		<AppContext.Provider
			value={{
				routes,
			}}
		>
			<Provider store={store}>
				<Router history={hist}>
					<Authorization history={hist}>
						<Theme>
							<Layout />
						</Theme>
					</Authorization>
				</Router>
			</Provider>
		</AppContext.Provider>
	);
}
