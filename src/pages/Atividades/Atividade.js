import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
	Box,
	Grid,
	List,
	ListItem,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { useSelector } from 'react-redux';

import TabsComponent from '../../components/TabsComponent';
import HeaderComponent from '../../components/HeaderComponent';
import NewAtividade from './NewAtividade';

import * as services from '../../services/service';

function Atividades({ history }) {
	const [atividades, setAtividade] = useState([]);
	const user = useSelector(({ user }) => user)

	// const getAtividades = () => {
	// 	services
	// 		.fetchAtividades()
	// 		.then(res => {
	// 			setAtividade(res.data);
	// 		})
	// 		.catch(err => console.log(err));
	// };
	// useEffect(() => {
	// 	getAtividades();
	// }, []);

	return (
		user && (
			<>
				<HeaderComponent
					user={user}
					history={history}
					handleClick={page => history.push(page)}
				/>

				<Stack container component='main' mb={3} mx={2}>
					<Box>
						<Box className='content-header'>
							<Typography variant='h4' sx={{ mt: 3 }}>
								Atividades
							</Typography>
							<Typography variant='overline' className='subtitle hora'>
								{moment().format('dddd, DD MMM, LT')}
							</Typography>
						</Box>
						<Grid container spacing={2}>
							<Grid item xs={12} md={6} mb={3}>
								<NewAtividade onCreateAtividade={null} />
							</Grid>
							<Grid
								item
								container
								className='task-content'
								sx={{ display: 'flex' }}
								spacing={2}
							>
								{atividades
									.map(item => {
										return (
											<Grid
												item
												xs={12}
												sm={6}
												md={4}
												lg={3}
												xg={2}
												key={uuid()}
											>
												<Paper className='atividade'>
													<List>
														<ListItem>
															<Typography variant='body' className='serie'>
																<strong>Entrega:</strong>{' '}
																{moment(
																	item.dataParaEntrega,
																	'DD-MM-YYYY'
																).format('ddd, DD/MMM')}
															</Typography>
														</ListItem>
														<ListItem>
															<Typography variant='body' className='serie'>
																<strong>PDF:</strong>{' '}
																<Link to={item.documentoPDF} target='_blank'>
																	Atividade
																</Link>
															</Typography>
														</ListItem>
														<ListItem>
															<Typography variant='body' className='serie'>
																<strong>Pontos:</strong>{' '}
																{parseFloat(item.pontos).toFixed(1)}
															</Typography>
														</ListItem>
													</List>
												</Paper>
											</Grid>
										);
									})
									// RAY: tentei ordenar pela data mas foi o início de um sonho - deu tudo errado
									.sort(item => item.dataParaEntrega)}
							</Grid>
						</Grid>
					</Box>
				</Stack>
				<TabsComponent />
			</>
		)
	);
}

export default Atividades;
