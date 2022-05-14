
import React, { useEffect, useState } from 'react';

import {
	Container,
	Typography,
	Grid,
	Paper,
    Fab
} from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventNewDialog from './EventNewDialog';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import './calendar.css';

export default function Calendar() {
	const [events, setEvents] = useState([]);
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
                padding: 5
            }}
        >				
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Calendário escolar
            </Typography>	
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                Fique de olho em todos os eventos programados da escola
            </Typography>					
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                dateClick={handleOpen}
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
            <Fab 
                sx={{
                    position: "fixed",
                    bottom: (theme) => theme.spacing(5),
                    right: (theme) => theme.spacing(5)
                }}
                color="primary"
                aria-label="add" 
                onClick={handleOpen}
                >
                <AddCircleIcon />
            </Fab>  
        </Paper>
        </>
    )
}