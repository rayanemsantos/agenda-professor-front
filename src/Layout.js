import React from 'react';

import TabsComponent from './components/TabsComponent';
import HeaderComponent from './components/HeaderComponent';

import moment from 'moment';
import 'moment/locale/pt-br';

import { Box, Grid, Typography } from '@mui/material';

export default function Layout({
	// alignment,
	children,
	hasMenu,
	// hasTabs,
	history,
	title,
	user,
}) {
	return (
		<>
			<HeaderComponent hasMenu={hasMenu} user={user} history={history} />
			<Grid
				container
				justifyContent='center'
				sx={{
					backgroundColor: '#fdfdfd',
					position: 'fixed',
					top: '4rem',
					left: 0,
					height: [
						'calc(100vh - 7.5rem)',
						'calc(100vh - 7.5rem)',
						'calc(100vh - 4rem)',
					],
					overflowY: 'auto',
				}}
			>
				<Grid item xs={12} md={8} xl={7} sx={{ px: 2, mb: '2rem' }}>
					{title && (
						<Box className='content-header'>
							<Typography variant='h4' sx={{ mt: 3 }}>
								{title}
							</Typography>
							<Typography variant='overline' className='subtitle hora'>
								{moment().format('dddd, DD MMM, LT')}
							</Typography>
						</Box>
					)}
					{children}
				</Grid>
			</Grid>
			<TabsComponent hasTabs user={user} history={history} />
		</>
	);
}
