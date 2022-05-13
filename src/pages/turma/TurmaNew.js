import React, { useState, useEffect } from 'react';

import {
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Stack,
	OutlinedInput,
	Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import { grey } from '@mui/material/colors';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import * as service from '../../services/service';

export default function TurmaNew(props) {
	const { history } = props;

	const add = () => {
		service
			.newTurmas(form)
			.then(res => {
				history.push('/turmas');
			})
			.catch(err => {
				console.log(err);
			});
	};

	const edit = () => {
		service
			.editTurmas(form.id, form)
			.then(res => {
				history.push('/turmas');
			})
			.catch(err => {
				console.log(err);
			});
	};

	const [form, setForm] = useState({
		id: '',
		serie: '',
		identification: '',
		shift: '',
	});

	useEffect(() => {
		async function updateState() {
			const params = props.match.params;
			const { id } = params;

			if (id === 'new') {
			} else {
				service.fetchTurmas(id).then(res => {
					setForm(res.data);
				});
			}
		}

		updateState();
	}, [props.match.params]);
	const series = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const salas = ['A', 'B', 'C', 'D'];
	const turnos = ['Manhã', 'Tarde', 'Noite'];

	useEffect(() => {
		async function updateState() {
			const params = props.match.params;
			const { id } = params;

			if (id === 'new') {
			} else {
				service.fetchTurmas(id).then(res => {
					setForm(res.data);
				});
			}
		}

		updateState();
	}, [props.match.params]);

	return (
		<Container>
			<Paper sx={{ padding: 4 }}>
				<Typography variant='h5' sx={{ mt: 1 }}>
					{form.id ? 'Editar Turma' : 'Criar Turma'}
				</Typography>
				<Typography variant='body2' color={grey[600]}>
					Inicialize uma turma e adicione alunos
				</Typography>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Stack
						component='form'
						className='Cadastro'
						spacing={4}
						sx={{ mt: 2 }}
					>
						<Stack className='turma' spacing={2}>
							{/* <FormControl>
								<InputLabel id='cadastro-id'>Id da Turma</InputLabel>
								<Select
									label='Identificador da Turma'
									variant='outlined'
									type='number'
									name='id'
									id='cadastro-id'
									value={form.id}
									disabled
									required
								/>
							</FormControl> */}
							<FormControl>
								<InputLabel id='cadastro-serie'>Série</InputLabel>
								<Select
									label='Série'
									variant='outlined'
									type='text'
									name='serie'
									id='cadastro-serie'
									value={form.serie}
									onChange={e => setForm({ ...form, serie: e.target.value })}
									input={<OutlinedInput label='Série' />}
									required
								>
									{series.map(serie => (
										<MenuItem key={serie} value={serie}>
											{serie}ª série
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl>
								<InputLabel id='cadastro-identification'>Sala</InputLabel>
								<Select
									label='Sala'
									variant='outlined'
									type='text'
									name='identification'
									id='cadastro-identification'
									value={form.identification}
									onChange={e =>
										setForm({ ...form, identification: e.target.value })
									}
									input={<OutlinedInput label='Sala' />}
									required
								>
									{salas.map(sala => (
										<MenuItem key={sala} value={sala}>
											{sala}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl>
								<InputLabel id='cadastro-shift'>Turno</InputLabel>
								<Select
									label='Turno'
									variant='outlined'
									type='text'
									name='shift'
									id='cadastro-shift'
									value={form.shift}
									onChange={e => setForm({ ...form, shift: e.target.value })}
									input={<OutlinedInput label='Turno' />}
									required
								>
									{turnos.map(turno => (
										<MenuItem key={turno} value={turno.toUpperCase()}>
											{turno}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Stack>
						<Container
							px='0'
							sx={{
								display: 'flex',
								gap: '0.5rem',
								alignItems: 'center',
								justifyContent: 'flex-end',
							}}
						>
							<Button
								className={'secondary-button'}
								onClick={() => history.push('/turmas')}
								color='secondary'
								variant='outlined'
								size='large'
								sx={{ width: 'fit-content', my: 2 }}
							>
								Cancelar
							</Button>
							<Button
								className={'primary-button'}
								onClick={() => (form.id ? edit() : add())}
								color='primary'
								size='large'
								sx={{ width: 'fit-content', my: 2 }}
							>
								Salvar
							</Button>
						</Container>
					</Stack>
				</LocalizationProvider>
			</Paper>
		</Container>
	);
}
