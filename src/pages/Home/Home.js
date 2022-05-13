import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import * as services from '../../services/service';

import {
	Container,
	Box,
	Divider,
	List,
	ListItem,
	Stack,
	Typography,
} from '@mui/material';

function Home({ history }) {
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

	function schoolClassItem(item) {
		return (
			<ListItem className='turma'>
				<Link href='dashboard.html'>
					<List>
						<ListItem>
							<Typography variant='span' className='serie'>
								{item.serie} {item.identification}
							</Typography>
						</ListItem>
					</List>
				</Link>
			</ListItem>
		);
	}

	return (
		<Container>
			<Stack>
				<Box className='listas-turmas' sx={{ mt: 5 }}>
					<Typography variant='h5'>Turmas</Typography>
					<Box sx={{ display: 'flex', mt: 2, ml: 1 }}>
						<Box className='turno manha'>
							<Typography variant='h6'>Manhã</Typography>
							<List>
								{turmas
									.filter(item => item.shift === 'MANHÃ')
									.map(item => {
										return (
											<ListItem key={uuid()}>{schoolClassItem(item)}</ListItem>
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
											<ListItem key={uuid()}>{schoolClassItem(item)}</ListItem>
										);
									})}
							</List>
							{!turmas.filter(item => item.shift === 'TARDE').length && (
								<Typography variant='body2' className='colegio'>
									Sem turmas no momento
								</Typography>
							)}
						</Box>
					</Box>
				</Box>
			</Stack>
		</Container>
	);
}

export default Home;
