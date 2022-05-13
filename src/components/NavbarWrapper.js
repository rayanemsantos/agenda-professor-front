import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	AppBar,
	Box,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	SwipeableDrawer,
	Toolbar,
	Typography,
} from '@mui/material';
import {
	CoPresentRounded,
	GroupAddRounded,
	HomeRounded,
	LogoutRounded,
	Menu,
	PersonAddAltRounded,
} from '@mui/icons-material';
import { v4 as uuid } from 'uuid';
import { logout } from '../pages/store/user.reducer';

const NavbarWrapper = ({ history }) => {
	const anchor = 'left';
	const dispatch = useDispatch();
	const [state, setState] = useState({
		left: false,
	});

	const signout = () => {
		dispatch(logout());
		localStorage.removeItem('persist:user');
		history.push('/login');
		close();
	};

	const toggleDrawer = (anchor, open) => event => {
		setState({ ...state, [anchor]: open });
	};

	const push = path => {
		history.push(path);
		close();
	};
	const close = () => {
		setState({ left: false });
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
		// {
		// 	page: 'Calendário',
		// 	icon: EventRounded,
		// 	onClick: () => push('/calendario'),
		// },
		{
			page: 'Sair',
			icon: LogoutRounded,
			onClick: () => signout(),
		},
	];

	let sidebarItems = secretariaSidebar;

	return (
		<AppBar
			position='static'
			color='white'
			elevation={0}
			sx={{
				height: '64px',
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				width: 'auto',
			}}
		>
			<Grid container sx={{ my: 'auto', justifyContent: 'center' }}>
				<Grid item xs={12} md={8} xl={7}>
					<Toolbar>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={toggleDrawer(anchor, true)}
							color='inherit'
						>
							<Menu />
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

						<Box sx={{ flexGrow: 0 }}>
							<Box>
								<SwipeableDrawer
									anchor={'left'}
									open={state[anchor]}
									onClose={toggleDrawer('left', false)}
									onOpen={toggleDrawer('left', true)}
								>
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
								</SwipeableDrawer>
							</Box>
						</Box>
					</Toolbar>
				</Grid>
			</Grid>
		</AppBar>
	);
};
export default NavbarWrapper;
