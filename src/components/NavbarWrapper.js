import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	AppBar,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Drawer,
	Toolbar,
	Typography,
} from '@mui/material';
import {
	CoPresentRounded,
	GroupAddRounded,
	HomeRounded,
	LogoutRounded,
	PersonAddAltRounded,
} from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { v4 as uuid } from 'uuid';

import { logout } from '../pages/store/user.reducer';

const NavbarWrapper = ({ history }) => {
	const dispatch = useDispatch();

	const signout = () => {
		dispatch(logout());
		localStorage.removeItem('persist:user');
		history.push('/login');
	};

	const [open, setOpen] = useState(false);

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const push = path => {
		history.push(path);
	};
	const secretariaSidebar = [
		{
			page: 'Início',
			icon: HomeRounded,
			onClick: () => push('/'),
		},
		{
			page: 'Aluno',
			icon: GroupAddRounded,
			onClick: () => push('/alunos'),
		},
		{
			page: 'Professor',
			icon: PersonAddAltRounded,
			onClick: () => push('/professores'),
		},
		{
			page: 'Turmas',
			icon: CoPresentRounded,
			onClick: () => push('/turmas'),
		},
		// {
		// 	page: 'Atividades',
		// 	icon: TaskRounded,
		// 	onClick: () => push('/atividades'),
		// },
		{
			page: 'Sair',
			icon: LogoutRounded,
			onClick: () => signout(),
		},
	];

	let sidebarItems = secretariaSidebar;

	return (
		<>
			<AppBar position='absolute' open={open}>
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='open drawer'
						onClick={toggleDrawer}
						sx={{
							marginRight: '36px',
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						href='/'
						variant='h5'
						noWrap
						component='a'
						sx={{
							flexGrow: 1,
							textDecoration: 'none',
							color: 'inherit',
						}}
					>
						Agenda do professor
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer open={open} variant='temporary' onClose={toggleDrawer}>
				<Toolbar
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-end',
						px: [1],
						width: '15rem',
					}}
				>
					<IconButton onClick={toggleDrawer}>
						<ChevronLeftIcon />
					</IconButton>
				</Toolbar>
				<List>
					{sidebarItems.map(item => (
						<ListItem key={uuid()}>
							<ListItemButton onClick={item.onClick}>
								<ListItemIcon>
									<item.icon />
								</ListItemIcon>
								<ListItemText key={item.page} primary={item.page}>
									{item.page}
								</ListItemText>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</>
	);
};
export default NavbarWrapper;
