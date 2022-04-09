import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, ListItem, Paper, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { useSelector } from 'react-redux';

import Layout from '../../Layout';
import NewAtividade from './NewAtividade';

// import * as services from '../../services/service';

function Atividades({ history }) {
	const [atividades, setAtividade] = useState([]);
	const user = useSelector(({ user }) => user);

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
			<Layout user={user} history={history} title='Atividades'>
				<NewAtividade onCreateAtividade={null} />
				{atividades
					.map(item => {
						return (
							<Grid item xs={12} sm={6} md={4} lg={3} xg={2} key={uuid()}>
								<Paper className='atividade'>
									<List>
										<ListItem>
											<Typography variant='body' className='serie'>
												<strong>Entrega:</strong>{' '}
												{moment(item.dataParaEntrega, 'DD-MM-YYYY').format(
													'ddd, DD/MMM'
												)}
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
			</Layout>
		)
	);
}

export default Atividades;
