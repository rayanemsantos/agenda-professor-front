import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import {
	Box,
	Button,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from 'moment';

import ClassSelector from '../../components/ClassSelector';
import * as services from '../../services/service';

const defaultState = {
	documentoPDF: '',
	dataParaEntrega: moment().add(7, 'days').format(),
	pontos: '',
	errorMessage: '',
};

function NewAtividade({ onCreateAtividade }) {
	const [atividades, setAtividade] = useState([]);
	const [logged, setLogged] = useState(true);
	const [user, setUser] = useState(null);
	const [form, setForm] = useState(defaultState);

	const getUser = () => {
		if (!localStorage.getItem('user')) {
			setLogged(false);
		} else {
			var data = JSON.parse(localStorage.getItem('user'));
			setUser(data);
			getAtividades(data.user);
		}
	};
	const getAtividades = user => {
		services
			.fetchAtividades()
			.then(res => {
				setAtividade(res.data);
			})
			.catch(err => console.log(err));
	};
	const newAtividade = () => {
		services
			.newAtividade(form)
			.then(res => {
				setForm(defaultState);
				onCreateAtividade();
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
				<Box component='section' className='form'>
					<Paper
						className='atividade-form'
						sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
					>
						<Typography
							component='h2'
							variant='body2'
							sx={{ fontWeight: 'bold' }}
						>
							Turma
						</Typography>
						<ClassSelector />
						{/* {errorMessage !== '' && message(errorMessage)} */}
						<Stack
							component='form'
							sx={{
								display: 'flex',
								gap: 2,
							}}
						>
							<Typography
								component='h2'
								variant='body2'
								sx={{ fontWeight: 'bold' }}
							>
								Nova atividade
							</Typography>
							<TextField
								type='text'
								name='documentoPDF'
								id='cadastro-documentoPDF'
								label='Documento'
								value={form.documentoPDF}
								onChange={e =>
									setForm({ ...form, documentoPDF: e.target.value })
								}
								required
							/>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									label='Data de Entrega'
									id='cadastro-dataParaEntrega'
									inputFormat='dd/MM'
									value={form.dataParaEntrega}
									onChange={value =>
										setForm({ ...form, dataParaEntrega: value })
									}
									renderInput={params => <TextField {...params} />}
									required
								/>
							</LocalizationProvider>
							<TextField
								label='Pontos'
								type='number'
								name='pontos'
								id='cadastro-pontos'
								value={form.pontos}
								onChange={e => setForm({ ...form, pontos: e.target.value })}
								required
							/>
						</Stack>

						<Button
							className={'primary-button'}
							sx={{
								mt: 3,
								opacity:
									form.documentoPDF === '' ||
									form.dataParaEntrega === '' ||
									form.pontos === ''
										? 0.5
										: 1,
								justifySelf: 'flex-end',
							}}
							disabled={
								form.documentoPDF === '' ||
								form.dataParaEntrega === '' ||
								form.pontos === ''
							}
							onClick={() => newAtividade()}
						>
							Adicionar
						</Button>
					</Paper>
				</Box>
			</>
		)
	);
}

export default NewAtividade;
