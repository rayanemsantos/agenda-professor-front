import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';

import {
	HomeRounded,
	CoPresentRounded,
	StickyNote2Rounded,
	HowToRegRounded,
} from '@mui/icons-material';

export default function TabsComponent({ usuario }) {
	const [value, setValue] = useState(0);
	const navBarItems = [
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
	return usuario === '' || 'professor' ? (
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
					{navBarItems.map(item => (
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
	) : (
		''
	);
}
