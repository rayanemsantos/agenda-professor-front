import React, { useState } from 'react';

import Box from '@mui/material/Box';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import {
	HomeRounded,
	CoPresentRounded,
	StickyNote2Rounded,
	HowToRegRounded,
	GroupAddRounded,
	PersonAddAltRounded,
} from '@mui/icons-material';

export default function TabsComponent({ hasTabs, history, user }) {
	const [value, setValue] = useState(0);
	const navBarProfessor = [
		{
			page: 'Início',
			icon: HomeRounded,
		},
		{
			page: 'Turmas',
			icon: CoPresentRounded,
		},
		{
			page: 'Frequência',
			icon: HowToRegRounded,
		},
		{
			page: 'Diário',
			icon: StickyNote2Rounded,
		},
	];
	const navBarSecretaria = [
		{
			page: 'Início',
			icon: HomeRounded,
			onClick: () => history.push('/'),
		},
		{
			page: 'Turmas',
			icon: CoPresentRounded,
		},
		{
			page: 'Add Aluno',
			icon: GroupAddRounded,
			onClick: () => history.push('/cadastrar-aluno'),
		},
		{
			page: 'Add Professor',
			icon: PersonAddAltRounded,
			onClick: () => history.push('/cadastrar-professor'),
		},
	];
	let navBar = [];
	if (user && user.type === 'professor') {
		navBar = navBarProfessor;
	} else if (user && user.type === 'secretaria') {
		navBar = navBarSecretaria;
	}

	return (
		hasTabs && (
			<Box
				sx={{
					position: 'fixed',
					bottom: 0,
					left: 0,
					right: 0,
					width: 'auto',
					display: { xs: 'block', md: 'none' },
				}}
			>
				<Paper elevation={3}>
					<BottomNavigation
						showLabels
						value={value}
						onChange={(event, newValue) => {
							setValue(newValue);
						}}
					>
						{navBar.map(item => (
							<BottomNavigationAction
								key={item.page}
								label={item.page}
								icon={<item.icon />}
								onClick={item.onClick}
							/>
						))}
					</BottomNavigation>
				</Paper>
			</Box>
		)
	);
}
