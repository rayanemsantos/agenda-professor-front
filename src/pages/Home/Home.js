import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Typography, Grid, Paper } from '@mui/material';

import Calendar from '../../components/Calendar/Calendar';

function DashboardCard(title, count = 0) {
	return (
		<Link to={`/${title.toLowerCase()}`} style={{ textDecoration: 'none' }}>
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
	return (
		<Container maxWidth='lg' sx={{ mt: 2, mb: 2 }}>
			{/* TODO Em breve rota com os números */}
			<Grid container spacing={3}>
				<Grid item xs={6} md={3}>
					{DashboardCard('Alunos', 523)}
				</Grid>
				<Grid item xs={6} md={3}>
					{DashboardCard('Professores', 16)}
				</Grid>
				<Grid item xs={6} md={3}>
					{DashboardCard('Turmas', 18)}
				</Grid>
				<Grid item xs={6} md={3}>
					{DashboardCard('Eventos', 4)}
				</Grid>
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
