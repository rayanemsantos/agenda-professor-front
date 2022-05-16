import React, { useState } from 'react';
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
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DragHandleRounded, CloseRounded } from '@mui/icons-material';

function EventNewDialog({
	onCreateEvent,
	open,
	close,
	usuario,
	startDateTime = new Date(),
	endDateTime = new Date(),
}) {
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [value, setValue] = useState(0);
	// const [repetition, setRepetition] = useState(arr[1]);
	// const [color, setColor] = useState('default');

	// const handleColor = e => {
	// 	color !== 'primary' ? setColor('primary') : setColor('default');
	// };
	// const handleRepetition = e => {
	// 	setRepetition(e.target.value);
	// };

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const weekDays = [
		'Domingo',
		'Segunda',
		'Terça',
		'Quarta',
		'Quinta',
		'Sexta',
		'Sábado',
	];

	// RAY: O chip qd clica ta marcando tudo. Help.
	// RAY: No momento o botão de salvar só ta fechando o modal
	// TODO: Responsividade (fullscreen on mobile)
	const nodeRef = React.useRef(null);
	return (
		open && (
			<Grid container>
				<Grid item xs={12} md={8} lg={6}>
					<Dialog
						ref={nodeRef}
						open={open}
						onClose={close}
						usuario={usuario}
						maxWidth='sm'
						fullWidth
						aria-labelledby='draggable-dialog-title'
					>
						<DialogTitle
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<DragHandleRounded color='white' />
							<CloseRounded onClick={close} sx={{ cursor: 'pointer' }} />
						</DialogTitle>
						<DialogContent
							sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
						>
							<TextField
								placeholder='Adicionar título'
								fullWidth
								variant='standard'
								margin='normal'
							/>
							{/* {usuario === 'secretaria' ? ( */}
							<Tabs value={value} onChange={handleChange} sx={{ mb: 2 }}>
								<Tab label='Evento' index={0} variant='text' />
								<Tab label='Entrega de Atividade' index={1} variant='text' />
								<Tab label='Feriado' index={2} variant='text' />
								<Tab label='Outros' index={3} />
							</Tabs>
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
							<Stack>
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
							</Stack>
						</DialogContent>
						<DialogActions mt={3}>
							<Button variant='text' onClick={close}>
								Cancelar
							</Button>
							<Button onClick={close}>Salvar</Button>
						</DialogActions>
					</Dialog>
				</Grid>
			</Grid>
		)
	);
}

export default EventNewDialog;
