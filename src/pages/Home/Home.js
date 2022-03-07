import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import TabsComponent from '../../components/TabsComponent';
import HeaderComponent from '../../components/HeaderComponent';
import * as services from '../../services/service';

import moment from 'moment';
import 'moment/locale/pt-br';

import {
	Box,
	Divider,
	Grid,
	List,
	ListItem,
	Stack,
	Typography,
	Container
} from '@mui/material';

function Home({ history }) {
	const [turmas, setTurmas] = useState([]);
	const [logged, setLogged] = useState(true);
	const [user, setUser] = useState(null);

	const getUser = () => {
		if (!localStorage.getItem('user')) {
			setLogged(false);
		} else {
			var data = JSON.parse(localStorage.getItem('user'));
			setUser(data);
			getTurmas(data.user);
		}
	};
	const getTurmas = user => {
		services
			.fetchTurmas(user)
			.then(res => {
				setTurmas(res.data);
			})
			.catch(err => console.log(err));
	};
	useEffect(() => {
		getUser();
	}, []);

	if (!logged) {
		return <Redirect to='/login' />;
	}

	// RAY: deixei 'pronto' pra receber os perfis 'professor' e 'secretaria'. Só dar um CTRL + SHIFT + F em 'usuario' e botar o obj
	let usuario = 'professor';

	return (
		user && (
			<>
				<HeaderComponent user={user} usuario={usuario} history={history} />
				<Grid container>
					<Grid item xs={12} sx={{ mx: 'auto' }}>
						<Stack sx={{ mx: 2 }}>
							<Box className='content-header'>
								<Typography variant='h4' sx={{ mt: 3 }}>
									Bem vindo, {user.nomeCompleto.split(' ', 1)}
								</Typography>
								<Typography variant='overline' className='subtitle hora'>
									{moment().format('dddd, DD MMM, LT')}
								</Typography>
							</Box>
							<Box className='listas-turmas' sx={{ mt: 5 }}>
								<Typography variant='h5'>Turmas</Typography>
								<Box sx={{ display: 'flex', mt: 2, ml: 1 }}>
									<Box className='turno-manha'>
										<Typography variant='h6'>Manhã</Typography>
										<List>
											{turmas
												.filter(item => item.turno === 'Manhã')
												.map(item => {
													return (
														<ListItem className='turma'>
															<Link href='dashboard.html'>
																<List>
																	<ListItem>
																		<Typography
																			variant='span'
																			className='serie'
																		>
																			{item.serie}
																		</Typography>
																	</ListItem>
																	<ListItem>
																		<Typography
																			variant='span'
																			className='colegio'
																		>
																			{item.escolaName}
																		</Typography>
																	</ListItem>
																</List>
															</Link>
														</ListItem>
													);
												})}
										</List>
										{!turmas.filter(item => item.turno === 'Manhã').length && (
											<Typography variant='body2' className='colegio'>
												Sem turmas no momento
											</Typography>
										)}
									</Box>
									<Divider orientation='vertical' flexItem sx={{ mx: 2 }} />
									<Box className='turno tarde'>
										<Typography variant='h6'>Tarde</Typography>
										<List>
											{turmas
												.filter(item => item.turno === 'Tarde')
												.map(item => {
													return (
														<ListItem className='turma'>
															<Link href='dashboard.html'>
																<List>
																	<ListItem>
																		<Typography
																			variant='span'
																			className='serie'
																		>
																			{item.serie}
																		</Typography>
																	</ListItem>
																	<ListItem>
																		<Typography
																			variant='span'
																			className='colegio'
																		>
																			{item.escolaName}
																		</Typography>
																	</ListItem>
																</List>
															</Link>
														</ListItem>
													);
												})}
										</List>
										{!turmas.filter(item => item.turno === 'Tarde').length && (
											<Typography variant='body2' className='colegio'>
												Sem turmas no momento
											</Typography>
										)}
									</Box>
								</Box>
							</Box>
						</Stack>
					</Grid>
				</Grid>
				<TabsComponent usuario={usuario} />
			</>
		)
	);
}

export default Home;
