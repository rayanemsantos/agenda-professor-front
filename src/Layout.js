import React from 'react';

import clsx from 'clsx';

import { makeStyles } from '@mui/styles';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, Zoom } from 'react-toastify';

import AppContext from './AppContext';
import TabsComponent from './components/TabsComponent';
import NavbarWrapper from './components/NavbarWrapper';

import 'react-toastify/dist/ReactToastify.min.css';

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		background: '#f9f9f9',
		'&.boxed': {
			maxWidth: 1280,
			margin: '0 auto',
			// boxShadow: theme.shadows[3]
		},
		'&.container': {
			'& .container': {
				maxWidth: 1120,
				width: '100%',
				margin: '0 auto',
			},
			'& .navigation': {},
		},
	},
	content: {
		marginTop: '5rem',
		display: 'flex',
		overflow: 'auto',
		flex: '1 1 auto',
		flexDirection: 'column',
		width: '100%',
		'-webkit-overflow-scrolling': 'touch',
		zIndex: 4,
	},
	toolbarWrapper: {
		display: 'flex',
		position: 'relative',
		zIndex: 5,
	},
	toolbar: {
		display: 'flex',
		flex: '1 0 auto',
	},
	footerWrapper: {
		position: 'relative',
		zIndex: 5,
	},
	footer: {
		display: 'flex',
		flex: '1 0 auto',
	},
}));

function Layout(props) {
	const { children, history } = props;

	const classes = useStyles(props);
	const user = useSelector(({ user }) => user);

	return (
		<>
			<AppContext.Consumer>
				{({ routes }) => (
					<>
						<div className={clsx(classes.root)}>
							{user && <NavbarWrapper history={history} />}
							<div className={clsx(classes.content)}>
								{renderRoutes(routes)}
								{children}
								<ToastContainer
									closeOnClick
									draggable
									newestOnTop
									hideProgressBar
									autoClose={5000}
									transition={Zoom}
									position='bottom-right'
									theme='colored'
								/>
							</div>
							{/* V2 professor será utilizado */}
							{/* <TabsComponent /> */}
						</div>
					</>
				)}
			</AppContext.Consumer>
		</>
	);
}
export default withRouter(Layout);
