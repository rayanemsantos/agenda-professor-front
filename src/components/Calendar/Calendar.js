import React, { useState } from 'react';

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
import './calendar.css';

export default function Calendar() {
	const [startDateTime, setStartDateTime] = useState();
	const [endDateTime, setEndDateTime] = useState();
	const [open, setOpen] = useState(false);

	const handleOpen = e => {
		setStartDateTime(e.start);
		setEndDateTime(e.end);
		setOpen(true);
	};
	const handleClose = e => {
		setOpen(false);
	};

	return (
		<>
			<EventNewDialog
				open={open}
				close={handleClose}
				startDateTime={startDateTime}
				endDateTime={endDateTime}
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
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
					dateClick={handleOpen()}
					initialView='timeGridWeek'
					selectable
					selectMirror
					nowIndicator
					slotMinTime='07:30:00'
					slotMaxTime='23:00:00'
					slotDuration='00:10:00'
					slotLabelInterval='00:50:00'
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
				/>
				<Fab
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
				</Fab>
			</Paper>
		</>
	);
}
