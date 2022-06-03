import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { Container, Typography, Grid, Paper, IconButton } from '@mui/material';
import {
	RemoveRedEye,
} from '@mui/icons-material';

import Calendar from '../../components/Calendar/Calendar';

import * as service from '../../services/service';

function DashboardCard(history, path, title, count = 0) {
	return (
		<Paper
			sx={{
				p: 2,
				display: 'flex',
				flexDirection: 'column',
				height: '10rem',
			}}
		>					
			<Typography component='h2' variant='h6' color='primary' gutterBottom>
				{title}

				{path && path !== '/' ? (<IconButton
					size='large'
					aria-label='account of current user'
					aria-controls='menu-appbar'
					aria-haspopup='true'
					onClick={() => history.push(`/${path}`)}
					color='inherit'
				>
					<RemoveRedEye />
				</IconButton>): null}					
			</Typography>
			<Typography component='p' variant='h4'>
				{count}
			</Typography>			
		</Paper>
	);
}

function Home(props) {
	const {history} = props;

	const [data, setData] = useState([]);

	useEffect(() => {
		service.fetchDashboard().then(res => {
			setData(res.data.data);
		});
	}, []);

	
	return (
		<Container maxWidth='lg' sx={{ mt: 2, mb: 2 }}>
			<Grid container spacing={3}>
				{
					data.map((_data) => {
						return <Grid item xs={6} md={3}>
							{DashboardCard(history, _data.path, _data.field, _data.count)}
						</Grid>
					})
				}
			</Grid>
			<Grid container spacing={3} marginTop={0}>
				<Grid item xs={12}>
					<Calendar />
				</Grid>
			</Grid>
		</Container>
	);
}

export default Home;
