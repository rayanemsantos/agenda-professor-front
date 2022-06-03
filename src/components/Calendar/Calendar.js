import React, { useState, useEffect } from 'react';

import { Typography, Paper, Fab } from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventNewDialog from './EventNewDialog';
import {
	AddCircleRounded,
	ArrowBackIosRounded,
	ArrowForwardIosRounded,
} from '@mui/icons-material';
import * as services from '../../services/service';
import moment from 'moment';

import './calendar.css';

export default function Calendar() {
	const [startDateTime, setStartDateTime] = useState();
	const [endDateTime, setEndDateTime] = useState();
	const [open, setOpen] = useState(false);
	const [event, setEvent] = useState(null);
	const [data, setData] = useState([]);
	
	const handleOpen = (e) => {
		setOpen(true);
		setStartDateTime(e.start);
		setEndDateTime(e.end);
	};
	
	const handleClickEvent = e => {
		setOpen(true);
		setEvent(e.event.id);

	};
	const handleClose = () => {
		setOpen(false);
	};
	
	useEffect(() => {
		handleEvents();
	}, []);

	const handleEvents = () => {
		handleClose();
		services.fetchEvents().then((res) => {
			const list = res.data.map((_r) => {return  {..._r, start: moment.utc(_r.date_schedule).format("YYYY-MM-DD")}})
			setData(list)
		}).catch((err) => {
			console.log(err)
		})
	}

	return (
		<>
			<EventNewDialog
				open={open}
				event={event}
				close={handleClose}
				startDateTime={startDateTime}
				endDateTime={endDateTime}
				onCreateEvent={handleEvents}
			/>
			<Paper
				sx={{
					height: 'auto',
					padding: 2,
				}}
			>
				<Typography component='h2' variant='h6' color='primary' gutterBottom>
					Calendário escolar
				</Typography>
				<Typography color='text.secondary' variant='caption' sx={{ flex: 1 }}>
					Fique de olho em todos os eventos programados da escola
				</Typography>
				<FullCalendar
				 	editable
					plugins={[dayGridPlugin, interactionPlugin]}
					// , timeGridPlugin, interactionPlugin
					select={handleOpen}
					// initialView='timeGridWeek'
					selectable
					selectMirror
					nowIndicator
					// slotMinTime='07:30:00'
					// slotMaxTime='23:00:00'
					// slotDuration='00:10:00'
					// slotLabelInterval='00:50:00'
					eventTimeFormat={false}
					weekends={false}
					locales='allLocales'
					locale='pt-br'
					headerToolbar={{
						end: 'today prev,next',
					}}
					buttonText={{
						today: 'Hoje',
						prev: <ArrowBackIosRounded fontSize='small' />,
						next: <ArrowForwardIosRounded fontSize='small' />,
					}}
					eventColor='#4a148c'
					events={data}
					eventClick={handleClickEvent}
				/>
				{/* <Fab
					sx={{
						position: 'fixed',
						bottom: theme => theme.spacing(5),
						right: theme => theme.spacing(5),
						zIndex: 1500,
					}}
					color='primary'
					aria-label='add'
					onClick={handleOpen}
				>
					<AddCircleRounded />
				</Fab> */}
			</Paper>
		</>
	);
}
