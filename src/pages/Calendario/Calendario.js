import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Stack, Typography } from '@mui/material';

import TabsComponent from '../../components/TabsComponent';
import HeaderComponent from '../../components/HeaderComponent';
import NewCalendario from './NewCalendario';

import * as services from '../../services/service';

function Calendario({ history }) {
	const [events, setEvents] = useState([]);
	const [logged, setLogged] = useState(true);
	const [user, setUser] = useState(null);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// RAY: Tipo de usuário mocado
	const usuario = 'secretaria';

	const getUser = () => {
		if (!localStorage.getItem('user')) {
			setLogged(false);
		} else {
			var data = JSON.parse(localStorage.getItem('user'));
			setUser(data);
			getEvents();
		}
	};

	const getEvents = () => {
		services
			.fetchEvents()
			.then(res => {
				setEvents(res.data);
			})
			.catch(err => console.log(err));
	};
	useEffect(() => {
		getUser();
	}, []);

	if (!logged) {
		return <Redirect to='/login' />;
	}

	return (
		user && (
			<>
				<HeaderComponent
					user={user}
					history={history}
					handleClick={page => history.push(page)}
				/>
				<Box type='main'>
					<Box type='section'>
						<Box className='content-header'>
							<Typography variant='h4' sx={{ mt: 3 }}>
								Calendário
							</Typography>
							<Typography variant='overline' className='subtitle hora'>
								{moment().format('dddd, DD MMM, LT')}
							</Typography>
						</Box>

						{/* <NewCalendario onCreateEvent={() => getEvents()} /> */}

						<Box className='task-content'>
							<NewCalendario
								open={open}
								close={handleClose}
								usuario={usuario}
							/>
							<FullCalendar
								plugins={[dayGridPlugin, interactionPlugin]}
								dateClick={handleOpen}
								initialView='dayGridMonth'
							/>
							{/* {events.map(item => {
								return (
									<div className='atividade'>
										<ul>
											<li>
												<span className='serie'>{item.evento}</span>
											</li>
											<li>
												<span className='serie'>{item.data}</span>
											</li>
										</ul>
									</div>
								);
							})} */}
						</Box>
					</Box>
				</Box>
				<TabsComponent />
			</>
		)
	);
}

export default Calendario;
