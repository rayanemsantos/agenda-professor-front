import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
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
import MuiAppBar from '@mui/material/AppBar';
import {
	CoPresentRounded,
	GroupAddRounded,
	HomeRounded,
	LogoutRounded,
	Menu,
	PersonAddAltRounded,
} from '@mui/icons-material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider } from '@mui/material';
import { v4 as uuid } from 'uuid';

import { logout } from '../pages/store/user.reducer';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
	  easing: theme.transitions.easing.sharp,
	  duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
	  marginLeft: drawerWidth,
	  width: `calc(100% - ${drawerWidth}px)`,
	  transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	  }),
	}),
  }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
            },
        }),
        },
    }),
);
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

    const [open, setOpen] = useState(true);
	
    const toggleDrawer = () => {
      setOpen(!open);
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
		<>
		<Hidden mdDown>
			<Box sx={{ display: 'flex' }}>
			<AppBar
				 position="absolute"
				 open={open}
				 sx={{
					pr: '24px', // keep right padding when drawer closed
				}}
			>
				<Toolbar>		
					<IconButton
					edge="start"
					color="inherit"
					aria-label="open drawer"
					onClick={toggleDrawer}
					sx={{
						marginRight: '36px',
						...(open && { display: 'none' }),
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
			<Drawer
				open={open}
				variant="permanent" 
			>
			<Toolbar
				sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-end',
				px: [1],
				}}
			>
				<IconButton onClick={toggleDrawer}>
				<ChevronLeftIcon />
				</IconButton>
			</Toolbar>
			<Divider />		
			<Divider />						
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
			</Box>					
		</Hidden>
		<Hidden lgUp>
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
							onClick={toggleDrawer}
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

						<Box sx={{ display: 'flex' }}>
							<SwipeableDrawer
								anchor='left'
								open={open}
								onClose={toggleDrawer}
							>			
								<Toolbar
									sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'flex-end',
									px: [1],
									}}
								>
									<IconButton onClick={toggleDrawer}>
									<ChevronLeftIcon />
									</IconButton>
									<Divider />
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
							</SwipeableDrawer>
						</Box>
					</Toolbar>
				</Grid>
			</Grid>
		</AppBar>
		</Hidden>
		</>
	);
};
export default NavbarWrapper;
