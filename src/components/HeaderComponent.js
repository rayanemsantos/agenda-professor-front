import React, { useState } from 'react';
import {
	AppBar,
	Box,
	Button,
	Container,
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

const HeaderComponent = ({ history, user, hasMenu, usuario }) => {
	const anchor = 'right';
	const [state, setState] = useState({
		right: false,
	});
	const signout = () => {
		localStorage.removeItem('user');
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
		},
		{
			page: 'Cadastrar Professor',
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
			page: 'Sair',
			icon: LogoutRounded,
			onClick: () => signout(),
		},
	];

	let menuItems = [];
	if (usuario === 'professor') {
		menuItems = professorFixedMenu;
	} else if (usuario === 'secretaria') {
		menuItems = secretariaFixedMenu;
	}
	let sidebarItems = [];
	if (usuario === 'professor') {
		sidebarItems = professorSidebar;
	} else if (usuario === 'secretaria') {
		sidebarItems = secretariaSidebar;
	}

	return (
		<AppBar
			position='static'
			color='white'
			elevation={0}
			sx={{ height: '64px' }}
			className={usuario}
		>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography
						href='/'
						variant='h5'
						noWrap
						component='a'
						sx={{
							flexGrow: 1,
							textDecoration: 'none',
							display: { xs: 'flex', md: 'none' },
							color: 'inherit',
						}}
					>
						Canal d{usuario === 'professor' ? 'o' : 'a'}
						<Box
							component='span'
							fontWeight='fontWeightBold'
							sx={{ ml: 1, textTransform: 'capitalize' }}
						>
							{usuario}
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
							display: { xs: 'none', md: 'flex' },
							color: 'inherit',
						}}
					>
						Canal d
						{usuario === 'professor'
							? 'o'
							: usuario === 'secretaria'
							? 'a'
							: 'a'}
						<Box
							component='span'
							fontWeight='fontWeightBold'
							sx={{ ml: 1, textTransform: 'capitalize' }}
						>
							{usuario ? usuario : 'escola'}
						</Box>
					</Typography>

					{hasMenu !== false ? (
						<Box sx={{ flexGrow: 0 }}>
							<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
									className={usuario}
								>
									<List className={usuario}>
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
					) : (
						''
					)}

					{hasMenu !== false ? (
						<Box
							sx={{
								ml: 'auto',
								display: { xs: 'none', md: 'flex' },
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
									display: { xs: 'none', md: 'flex' },
								}}
							>
								<Menu />
							</IconButton>
						</Box>
					) : (
						''
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default HeaderComponent;
