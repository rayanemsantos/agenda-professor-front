import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { Container, Typography, Grid, Paper } from '@mui/material';

import Calendar from '../../components/Calendar/Calendar';

import * as service from '../../services/service';

function DashboardCard(path, title, count = 0) {
	return (
		<Link to={`/${path}`} style={{ textDecoration: 'none' }}>
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
				</Typography>
				<Typography component='p' variant='h4'>
					{count}
				</Typography>
			</Paper>
		</Link>
	);
}

function Home() {
	const [data, setData] = useState([]);

	useEffect(() => {
		service.fetchDashboard().then(res => {
			setData(res.data.data);
		});
	}, []);

	
	return (
		<Container maxWidth='lg' sx={{ mt: 2, mb: 2 }}>
			{/* TODO Em breve rota com os números */}
			<Grid container spacing={3}>
				{
					data.map((_data) => {
						return <Grid item xs={6} md={3}>
							{DashboardCard(_data.path, _data.field, _data.count)}
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
