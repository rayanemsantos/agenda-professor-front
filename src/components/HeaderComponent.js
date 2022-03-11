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
	CoPresentOutlined,
	EventOutlined,
	HomeOutlined,
	HowToRegOutlined,
	LogoutOutlined,
	Menu,
	SchoolOutlined,
	StickyNote2Outlined,
	TaskOutlined,
} from '@mui/icons-material';
import { v4 as uuid } from 'uuid';

const HeaderComponent = ({ history, user, hasMenu, usuario = 'professor' }) => {
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
	const professorSidebar = [
		{
			page: 'Início',
			icon: HomeOutlined,
		},
		{
			page: 'Turmas',
			icon: CoPresentOutlined,
		},
		{
			page: 'Atividades',
			icon: TaskOutlined,
			onClick: () => history.push('/atividades'),
		},
		{
			page: 'Calendário',
			icon: EventOutlined,
			onClick: () => history.push('/calendario'),
		},
		{
			page: 'Frequência',
			icon: HowToRegOutlined,
		},
		{
			page: 'Diário de Classe',
			icon: StickyNote2Outlined,
		},
		{
			page: 'Notas',
			icon: SchoolOutlined,
		},
		{
			page: 'Sair',
			icon: LogoutOutlined,
			onClick: () => signout(),
		},
	];

	const secretariaSidebar = [
		{
			page: 'Cadastrar Aluno',
		},
		{
			page: 'Cadastrar Professor',
		},
		{
			page: 'Turmas',
		},
		{
			page: 'Sair',
			onClick: () => signout(),
		},
	];

	let menuItems = [];
	if (usuario === 'professor') {
		menuItems = professorFixedMenu;
	} else if (usuario === 'secretaria') {
		menuItems = secretariaSidebar;
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
						Canal d{usuario === 'professor' ? 'o' : 'a'}
						<Box
							component='span'
							fontWeight='fontWeightBold'
							sx={{ ml: 1, textTransform: 'capitalize' }}
						>
							{usuario}
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
										{professorSidebar.map(item => (
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
