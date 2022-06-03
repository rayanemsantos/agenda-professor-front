import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	// Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	// MenuItem,
	// Paper,
	Stack,
	Tab,
	Tabs,
	TextField,
	Typography,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DragHandleRounded, CloseRounded } from '@mui/icons-material';
import moment from 'moment';
import * as service from '../../services/service';
import feedbackService from '../../services/feedbackService';

function EventNewDialog({
	onCreateEvent,
	open,
	close,
	event,
	usuario,
	startDateTime = new Date(),
	endDateTime = new Date(),
}) {
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [form, setForm] = useState({
		title: '',
		description: ''
	});

	const handleClose = () => {
		close();
		setForm({
			title: '',
			description: ''
		})
	}
	// const [repetition, setRepetition] = useState(arr[1]);
	// const [color, setColor] = useState('default');

	// const handleColor = e => {
	// 	color !== 'primary' ? setColor('primary') : setColor('default');
	// };
	// const handleRepetition = e => {
	// 	setRepetition(e.target.value);
	// };


	useEffect(() => {
		if(event){
			service.fetchEvent(event).then((res) => {
				setForm(res.data)
			})
		}
	}, [event]);

	const handleChange = (label, value) => {
		setForm({...form, [label]: value});
	};

	const handleSave = () => {
		if(form.id){
			service.editEvent(form.id, {
				title:form.title,
				description:form.description
			}).then((res) => {
				feedbackService.showMessage('Evento editado com sucesso!', 'success')
				setForm({
					title: '',
					description: ''
				})
				onCreateEvent();
			}).catch((err) => {
				feedbackService.showMessage('Ops! Houve um erro ao editar evento.', 'error')
			})
		} else {
			service.newEvent({
				title:form.title,
				description:form.description,
				date_schedule: moment(startDateTime).format("YYYY-MM-DDT00:00")
			}).then((res) => {
				feedbackService.showMessage('Evento cadastrado com sucesso!', 'success')
				setForm({
					title: '',
					description: ''
				})
				onCreateEvent();
			}).catch((err) => {
				feedbackService.showMessage('Ops! Houve um erro ao cadastrar evento.', 'error')
			})
		}
	}

	const weekDays = [
		'Domingo',
		'Segunda',
		'Terça',
		'Quarta',
		'Quinta',
		'Sexta',
		'Sábado',
	];
	const nodeRef = React.useRef(null);

	return (
		open && (
			<Grid container>
				<Grid item xs={12} md={8} lg={6}>
					<Dialog
						ref={nodeRef}
						open={open}
						onClose={handleClose}
						usuario={usuario}
						maxWidth='sm'
						fullWidth
						aria-labelledby='draggable-dialog-title'
					>
						<DialogTitle sx={{ mb: 3, mt: 0, p: 2 }} color="primary">
							Novo evento
						</DialogTitle>
						<DialogContent
							sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
						>						
							<TextField
								placeholder='Adicionar título'
								variant='standard'
								margin='normal'
								onChange={(ev) => handleChange('title', ev.target.value)}
								value={form.title}
								fullWidth
							/>
							<TextField
								placeholder='Descrição (opcional)'
								variant='standard'
								margin='normal'
								onChange={(ev) => handleChange('description', ev.target.value)}
								value={form.description}
								minRows={3}
								multiline
								rows={2}
								fullWidth
							/>							
							
							{/* {usuario === 'secretaria' ? ( */}
							{/* <Tabs value={value} onChange={handleChange} sx={{ mb: 2 }}>
								<Tab label='Evento' index={0} variant='text' />
								<Tab label='Entrega de Atividade' index={1} variant='text' />
								<Tab label='Feriado' index={2} variant='text' />
								<Tab label='Outros' index={3} />
							</Tabs> */}
							{/* ) : (
								<Tabs value={value} onChange={handleChange} sx={{ mb: 2 }}>
									<Tab label='Prova' index={0} />
									<Tab label='Entrega de Atividade' index={1} />
									<Tab label='Lembrete' index={2} />
								</Tabs>
							)} */}
							{/* {usuario === 'secretaria' ? (
					<Stack my={2} sx={{ gap: 0.5 }}>
						<Typography variant='body2' fontWeight='medium'>
							Repetir:
						</Typography>
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Box sx={{ display: 'flex', gap: 1 }}>
								{weekDays.map(item => {
									return (
										<Chip
											label={item.charAt(0)}
											value={item}
											onClick={handleColor}
											color={color}
										/>
									);
								})}
							</Box>
							<TextField
								onChange={handleRepetition}
								select
								value={repetition}
								variant='outlined'
								sx={{ minWidth: '115px' }}
								label='Frequência'
							>
								{arr.map(item => {
									return (
										<MenuItem value={item} key={uuid()}>
											{item}
										</MenuItem>
									);
								})}
							</TextField>
						</Box>
					</Stack>
				) : (
					''
				)} */}
							{/* <Stack>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<Box sx={{ display: 'flex', gap: 2 }}>
										<Stack sx={{ display: 'flex', gap: 2 }}>
											<Typography variant='h6'>
												{weekDays[startDateTime.getDay()]}
											</Typography>
											<DatePicker
												onChange={newTime => {
													setStartTime(newTime);
												}}
												value={startDateTime}
												inputFormat='dd/MM/yyyy'
												renderInput={params => (
													<TextField variant='outlined' {...params} />
												)}
												required
											/>
											<TimePicker
												onChange={newTime => {
													setStartTime(newTime);
												}}
												value={startDateTime}
												renderInput={params => (
													<TextField variant='outlined' {...params} />
												)}
												required
												ampm={false}
											/>
										</Stack>
										<Stack sx={{ display: 'flex', gap: 2 }}>
											<Typography variant='h6'>
												{weekDays[endDateTime.getDay()]}
											</Typography>
											<DatePicker
												onChange={newTime => {
													setEndTime(newTime);
												}}
												value={endDateTime}
												inputFormat='dd/MM/yyyy'
												renderInput={params => (
													<TextField variant='outlined' {...params} />
												)}
												required
											/>
											<TimePicker
												value={endDateTime}
												onChange={newTime => {
													setEndTime(newTime);
												}}
												renderInput={params => (
													<TextField variant='outlined' {...params} />
												)}
												required
												ampm={false}
											/>
										</Stack>
									</Box>
								</LocalizationProvider>
							</Stack> */}
						</DialogContent>
						<DialogActions mt={3}>
							<Button variant='text' onClick={handleClose}>
								Cancelar
							</Button>
							<Button onClick={handleSave}
									disabled={form.title === ''}>Salvar</Button>
						</DialogActions>
					</Dialog>
				</Grid>
			</Grid>
		)
	);
}

export default EventNewDialog;
