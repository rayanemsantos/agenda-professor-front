import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

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
} from '@mui/material';

function Home({ history }) {
	const user = useSelector(({ user }) => user);
	let usuario = user.type;
	const [turmas, setTurmas] = useState([]);
	
	const getTurmas = () => {
		services
			.fetchTurmas()
			.then(res => {
				setTurmas(res.data);
			})
			.catch(err => console.log(err));
	};
	useEffect(() => {
		getTurmas();
	}, []);
	
	function schoolClassItem(item){
		return (
			<ListItem className='turma'>
			<Link href='dashboard.html'>
				<List>
					<ListItem>
						<Typography
							variant='span'
							className='serie'
						>
							{item.serie} {item.identification}
						</Typography>
					</ListItem>
				</List>
			</Link>
		</ListItem>
		)
	}

	return (
		user && (
			<>
				<HeaderComponent user={user} history={history} />
				<Grid container>
					<Grid item xs={12} sx={{ mx: 'auto' }}>
						<Stack sx={{ mx: 2 }}>
							<Box className='content-header'>
								<Typography variant='h4' sx={{ mt: 3 }}>
									Bem vindo, {user.user.username.split(' ', 1)}
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
											{/* RAY: Fiz algumas turmas pra mim mas não tão retornando. Depois da uma olhada se fiz besteira? */}
											{turmas
											.filter(item => item.shift === 'MANHÃ')
											.map(item => {
												return (
													<>{schoolClassItem(item)}</>
												);
											})}
										</List>
										{!turmas.filter(item => item.shift === 'MANHÃ').length && (
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
											.filter(item => item.shift === 'TARDE')
											.map(item => {
												return (
													<>{schoolClassItem(item)}</>
												);
											})}
										</List>
										{!turmas.filter(item => item.shift === 'Tarde').length && (
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
