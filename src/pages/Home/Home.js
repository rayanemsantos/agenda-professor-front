import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
	Box,
	Container,
	Grid,
	IconButton,
	Paper,
	Typography,
} from '@mui/material';
import { NavigateNextRounded } from '@mui/icons-material';

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
			<Box display='flex' justifyContent='space-between' alignContent='center'>
				<Typography
					component='h2'
					variant='h6'
					color='primary'
					gutterBottom
					sx={{
						lineHeight: 2,
					}}
				>
					{title}
				</Typography>
				{path && path !== '/' ? (
					<IconButton
						size='large'
						aria-label='account of current user'
						aria-controls='menu-appbar'
						aria-haspopup='true'
						onClick={() => history.push(`/${path}`)}
						color='inherit'
					>
						<NavigateNextRounded color='primary' />
					</IconButton>
				) : null}
			</Box>
			<Typography component='p' variant='h4'>
				{count}
			</Typography>
		</Paper>
	);
}

function Home(props) {
	const { history } = props;

	const [data, setData] = useState([]);

	useEffect(() => {
		service.fetchDashboard().then(res => {
			setData(res.data.data);
		});
	}, []);

	return (
		<Container maxWidth='lg' sx={{ mt: 2, mb: 2 }}>
			<Grid container spacing={3}>
				{data.map(_data => {
					return (
						<Grid item xs={6} md={3}>
							{DashboardCard(history, _data.path, _data.field, _data.count)}
						</Grid>
					);
				})}
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
