import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import { Box, Stack, Typography } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';

import TabsComponent from '../../components/TabsComponent';
import HeaderComponent from '../../components/HeaderComponent';
import NewCalendario from './NewCalendario';

import * as services from '../../services/service';

function Calendario({ history, usuario }) {
	const [events, setEvents] = useState([]);
	const [logged, setLogged] = useState(true);
	const [user, setUser] = useState(null);

	const [startDateTime, setStartDateTime] = useState();
	const [endDateTime, setEndDateTime] = useState();
	const [open, setOpen] = useState(false);
	const handleOpen = e => {
		setStartDateTime(e.start);
		setEndDateTime(e.end);

		return setOpen(true);
	};
	const handleClose = e => {
		return setOpen(false);
	};

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
					usuario={usuario}
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
								startDateTime={startDateTime}
								endDateTime={endDateTime}
							/>
							<FullCalendar
								plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
								select={handleOpen}
								initialView='timeGridWeek'
								selectable
								selectMirror
								nowIndicator
								slotDuration='00:10:00'
								slotLabelInterval='01:00:00'
								eventTimeFormat={false}
								locales='allLocales'
								locale='pt-br'
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
