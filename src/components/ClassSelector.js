import React, { useEffect, useState } from 'react';
import { FormControl, MenuItem, TextField, Typography } from '@mui/material';
import { v4 as uuid } from 'uuid';
// import moment from 'moment';

import * as services from '../services/service';

export default function ClassSelector() {
	const [logged, setLogged] = useState(true);
	const [user, setUser] = useState(null);

	const [serie, setSerie] = useState([]);
	const [sala, setSala] = useState([]);
	const [turno, setTurno] = useState([]);

	// const [school, setSchool] = useState([]);
	// const [discipline, setDiscipline] = useState([]);

	const handleSerie = event => {
		setSerie(event.target.value);
	};
	const handleSala = event => {
		setSala(event.target.value);
	};
	const handleTurno = event => {
		setTurno(event.target.value);
	};

	const getUser = () => {
		if (!localStorage.getItem('user')) {
			setLogged(false);
		} else {
			var data = JSON.parse(localStorage.getItem('user'));
			setUser(data);
		}
	};
	useEffect(() => {
		getUser();
	}, []);

	const arrSerie = ['1', '2', '3'];
	const arrSala = ['a', 'b', 'c', 'd'];
	const arrTurno = ['Manhã', 'Tarde'];

	return (
		<FormControl
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				mb: 3,
			}}
			margin='normal'
		>
			<TextField
				select
				sx={{ width: '30%' }}
				label='Série'
				onChange={handleSerie}
				value={serie}
				variant='filled'
			>
				{arrSerie.map(item => {
					return (
						<MenuItem key={uuid()} value={item}>
							{item}
						</MenuItem>
					);
				})}
			</TextField>
			<TextField
				select
				sx={{ width: '30%' }}
				label='Turma'
				onChange={handleSala}
				value={sala}
				variant='filled'
			>
				{arrSala.map(item => {
					return (
						<MenuItem
							key={uuid()}
							value={item}
							sx={{ textTransform: 'capitalize' }}
						>
							{item}
						</MenuItem>
					);
				})}
			</TextField>
			<TextField
				select
				sx={{ width: '30%' }}
				label='Turno'
				onChange={handleTurno}
				value={turno}
				variant='filled'
			>
				{arrTurno.map(item => {
					return (
						<MenuItem
							key={uuid()}
							value={item}
							sx={{ textTransform: 'capitalize' }}
						>
							{item}
						</MenuItem>
					);
				})}
			</TextField>
		</FormControl>
	);
}
