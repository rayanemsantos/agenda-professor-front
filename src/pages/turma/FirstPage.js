import React, { useState, useEffect } from 'react';

import {
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	OutlinedInput,
	Step,
	Stepper,
	StepLabel,
} from '@mui/material';

import * as service from '../../services/service';

export default function FirstPage(props) {
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

	// useEffect(() => {
	// 	async function updateState() {
	// 		const params = props.match.params;
	// 		const { id } = params;

	// 		if (id === 'new') {
	// 		} else {
	// 			service.fetchTurmas(id).then(res => {
	// 				setForm(res.data);
	// 			});
	// 		}
	// 	}
	// 	updateState();
	// }, [props.match.params]);

	const series = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const salas = ['A', 'B', 'C', 'D'];
	const turnos = ['Manhã', 'Tarde', 'Noite'];

	return (
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
					onChange={e => setForm({ ...form, identification: e.target.value })}
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
	);
}
