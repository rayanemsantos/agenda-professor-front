import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as services from '../../services/service';

import {
	Container,
	Typography,
	Grid,
	Paper,
} from '@mui/material';

import Calendar from '../../components/Calendar/Calendar';

function DashboardCard(title, count=0) {
	return (
		<Paper
			sx={{
				p: 2,
				display: 'flex',
				flexDirection: 'column',
				height: 240,
			}}
		>
			<Typography component="h2" variant="h6" color="primary" gutterBottom>
				{title}
			</Typography>
			<Typography component="p" variant="h4">
			{count}
			</Typography>
			<div>
			<Link color="primary" href="#">
				Ver todos
			</Link>
			</div>
	  </Paper>
	);
}

function Home({ history }) {
	return (
		<Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
			{/* TODO Em breve rota com os números */}
			<Grid container spacing={3}>
				<Grid item xs={12} md={4} lg={3}>
					{DashboardCard('Alunos', 12)}
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					{DashboardCard('Professores', 12)}
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					{DashboardCard('Turmas', 12)}
				</Grid>
				<Grid item xs={12} md={4} lg={3}>
					{DashboardCard('Eventos', 12)}
				</Grid>								
			</Grid>
			<Grid container spacing={3} marginTop={5}>
				<Grid item md={12}>
					{/* obs: coloquei como componente ao inves de pagina */}
					{/* obs: tem um fab button pra abrir o dialog além do click na data */}
					<Calendar/>
				</Grid>
			</Grid>
		</Container>		
	);
}

export default Home;
