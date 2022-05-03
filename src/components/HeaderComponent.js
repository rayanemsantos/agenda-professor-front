import React, { useState } from 'react';
import {
	AppBar,
	Box,
	Button,
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
	EventRounded,
	GroupAddRounded,
	HomeRounded,
	HowToRegRounded,
	LogoutRounded,
	Menu,
	PersonAddAltRounded,
	SchoolRounded,
	StickyNote2Rounded,
	TaskRounded,
} from '@mui/icons-material';
import { v4 as uuid } from 'uuid';

const HeaderComponent = ({ alignment, history, hasMenu, user }) => {
	const anchor = 'right';
	const [state, setState] = useState({
		right: false,
	});
	const signout = () => {
		localStorage.removeItem('persist:user');
		history.push('/login');
	};
	const toggleDrawer = (anchor, open) => event => {
		setState({ ...state, [anchor]: open });
	};

	const professorFixedMenu = [
		{
			page: 'Frequência',
		},
		{
			page: 'Diário de Classe',
		},
		{
			page: 'Notas',
		},
	];
	const secretariaFixedMenu = [
		{
			page: 'Cadastrar Aluno',
			onClick: () => history.push('/cadastrar-aluno'),
		},
		{
			page: 'Cadastrar Professor',
			onClick: () => history.push('/cadastrar-professor'),
		},
		{
			page: 'Turmas',
		},
	];
	const professorSidebar = [
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
			page: 'Atividades',
			icon: TaskRounded,
			onClick: () => history.push('/atividades'),
		},
		{
			page: 'Calendário',
			icon: EventRounded,
			onClick: () => history.push('/calendario'),
		},
		{
			page: 'Frequência',
			icon: HowToRegRounded,
		},
		{
			page: 'Diário de Classe',
			icon: StickyNote2Rounded,
		},
		{
			page: 'Notas',
			icon: SchoolRounded,
		},
		{
			page: 'Sair',
			icon: LogoutRounded,
			onClick: () => signout(),
		},
	];
	const secretariaSidebar = [
		{
			page: 'Início',
			icon: HomeRounded,
			onClick: () => history.push('/'),
		},
		{
			page: 'Cadastrar Aluno',
			icon: GroupAddRounded,
			onClick: () => history.push('/cadastrar-aluno'),
		},
		{
			page: 'Cadastrar Professor',
			icon: PersonAddAltRounded,
			onClick: () => history.push('/cadastrar-professor'),
		},
		{
			page: 'Turmas',
			icon: CoPresentRounded,
		},
		{
			page: 'Atividades',
			icon: TaskRounded,
			onClick: () => history.push('/atividades'),
		},
		{
			page: 'Calendário',
			icon: EventRounded,
			onClick: () => history.push('/calendario'),
		},
		{
			page: 'Sair',
			icon: LogoutRounded,
			onClick: () => signout(),
		},
	];

	let menuItems = [];
	if (user && user.type === 'professor') {
		menuItems = professorFixedMenu;
	} else {
		menuItems = secretariaFixedMenu;
	}
	let sidebarItems = [];
	if (user && user.type === 'professor') {
		sidebarItems = professorSidebar;
	} else {
		sidebarItems = secretariaSidebar;
	}

	return (
		<AppBar
			position='static'
			color='white'
			elevation={0}
			className={user ? user.type : 'escola'}
			sx={{
				height: '64px',
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				width: 'auto',
			}}
		>
			<Grid
				container
				// maxWidth='xl'
				sx={{ my: 'auto', justifyContent: 'center' }}
			>
				<Grid item xs={12} md={8} xl={7}>
					<Toolbar>
						<Typography
							href='/'
							variant='h5'
							noWrap
							component='a'
							sx={{
								flexGrow: 1,
								textDecoration: 'none',
								display: { xs: 'flex', lg: 'none' },
								color: 'inherit',
							}}
						>
							Agenda d{user && user.type === 'professor' ? 'o' : 'a'}
							<Box
								component='span'
								fontWeight='fontWeightBold'
								sx={{ ml: 1, textTransform: 'capitalize' }}
							>
								{user ? user.type : 'escola'}
							</Box>
						</Typography>
						<Typography
							variant='h5'
							noWrap
							component='a'
							href='/'
							sx={{
								mr: 2,
								textDecoration: 'none',
								display: { xs: 'none', lg: 'flex' },
								color: 'inherit',
							}}
						>
							Agenda d{user && user.type === 'professor' ? 'o' : 'a'}
							<Box
								component='span'
								fontWeight='fontWeightBold'
								sx={{ ml: 1, textTransform: 'capitalize' }}
							>
								{user ? user.type : 'escola'}
							</Box>
						</Typography>
						{user && (
							<Box sx={{ flexGrow: 0 }}>
								<Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
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
									<SwipeableDrawer
										anchor={'right'}
										open={state[anchor]}
										onClose={toggleDrawer('right', false)}
										onOpen={toggleDrawer('right', true)}
										className={user ? user.type : 'escola'}
									>
										<List className={user ? user.type : 'escola'}>
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
						)}
						{user && (
							<Box
								sx={{
									ml: 'auto',
									display: { xs: 'none', lg: 'flex' },
								}}
							>
								{menuItems.map(item => (
									<Button
										key={item.page}
										variant='text'
										color='inherit'
										sx={{ mx: 1, my: 2 }}
										onClick={item.onClick}
									>
										{item.page}
									</Button>
								))}
								<IconButton
									size='large'
									aria-label='account of current user'
									aria-controls='menu-appbar'
									aria-haspopup='true'
									onClick={toggleDrawer(anchor, true)}
									color='inherit'
									sx={{
										height: 'fit-content',
										my: 'auto',
										display: { xs: 'none', lg: 'flex' },
									}}
								>
									<Menu />
								</IconButton>
							</Box>
						)}
					</Toolbar>
				</Grid>
			</Grid>
		</AppBar>
	);
};
export default HeaderComponent;
