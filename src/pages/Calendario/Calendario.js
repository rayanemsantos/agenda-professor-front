import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import Layout from '../../Layout';
import NewCalendario from './NewCalendario';

import * as services from '../../services/service';

function Calendario({ history }) {
	const user = useSelector(({ user }) => user);
	const [events, setEvents] = useState([]);
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

	const getEvents = () => {
		services
			.fetchEvents()
			.then(res => {
				setEvents(res.data);
			})
			.catch(err => console.log(err));
	};
	useEffect(() => {
		getEvents();
	}, []);
	// handleClick={page => history.push(page)}
	return (
		<Layout user={user} history={history} title='Calendário'>
			<Box component='section'>
				{/* <NewCalendario onCreateEvent={() => getEvents()} /> */}
				<Box className='task-content'>
					<NewCalendario
						open={open}
						close={handleClose}
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
		</Layout>
	);
}

export default Calendario;
