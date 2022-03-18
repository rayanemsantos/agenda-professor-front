import React, { useState } from 'react';

import {
	Box,
	Button,
	Grid,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';

import HeaderComponent from './../../components/HeaderComponent';
import * as services from '../../services/service';

export default function Professor({ history, logged, user }) {
	const [form, setForm] = useState({
		nomeCompleto: '',
		email: '',
		password: '',
		formacao: '',
		dataNascimento: '1990-01-01',
		valid: true,
		errorMessage: '',
	});
	const [errorMessage, setErrorMessage] = useState('');

	const checkEmail = () => {
		services
			.signup(form)
			.then(res => {
				history.push('/cadastro/professor');
			})
			.catch(err => {
				setErrorMessage('Ops! Houve um problema ao realizar cadastro.');
			});
	};
	const message = message => {
		return <Typography>{message}</Typography>;
	};
	return (
		<>
			<HeaderComponent hasMenu={false} />
			<Grid
				container
				alignItems='center'
				justifyContent='center'
				sx={{ mt: 8 }}
			>
				<Grid item sx={{ width: 424, padding: 2 }}>
					<Paper sx={{ backgroundColor: '#f5f5f5', padding: 3 }}>
						<Box className='form' component='form'>
							<Stack className='Cadastro'>
								<Box className='text wrapper'>
									<Typography variant='h2'>Cadastro</Typography>
									<Typography variant='body2'>
										Crie sua conta e faça um pré-cadastro.
									</Typography>
								</Box>

								<Stack
									component='form'
									className='input wrapper'
									spacing={2}
									sx={{ mt: 2 }}
								>
									<TextField
										label='Nome Completo'
										type='text'
										name='nomeCompleto'
										id='cadastro-nomeCompleto'
										value={form.nomeCompleto}
										onChange={e =>
											setForm({ ...form, nomeCompleto: e.target.value })
										}
										required
									/>
									<TextField
										label='Email'
										type='email'
										name='email'
										id='cadastro-email'
										value={form.email}
										onChange={e => setForm({ ...form, email: e.target.value })}
										required
									/>
									<TextField
										label='Senha'
										type='password'
										name='password'
										id='cadastro-password'
										value={form.password}
										onChange={e =>
											setForm({ ...form, password: e.target.value })
										}
										required
									/>
									<TextField
										label='Formação'
										type='text'
										name='formacao'
										id='cadastro-formacao'
										value={form.formacao}
										onChange={e =>
											setForm({ ...form, formacao: e.target.value })
										}
										required
									/>
									<TextField
										label='Data de Nascimento'
										type='date'
										name='dataNascimento'
										id='cadastro-dataNascimento'
										value={form.dataNascimento}
										onChange={e =>
											setForm({ ...form, dataNascimento: e.target.value })
										}
										InputLabelProps={{
											shrink: true,
										}}
										required
										helperText={errorMessage !== '' && message(errorMessage)}
									/>
								</Stack>
								<Button
									className={'primary-button'}
									style={{
										opacity:
											form.email === '' && form.password === '' ? 0.5 : 1,
									}}
									disabled={form.email === '' && form.password === ''}
									onClick={() => checkEmail()}
									color='primary'
									size='large'
									sx={{ mt: 2, mb: 4 }}
								>
									Cadastrar
								</Button>
							</Stack>
							<Box alignItems='center' sx={{ width: 'fit-content' }} m='auto'>
								<Typography
									component='span'
									variant='body2'
									className='no-account'
								>
									Já tem conta?
								</Typography>
								<Button
									id='google-btn'
									className='primary-button'
									type='submit'
									onClick={() => history.push('/login')}
									color='primary'
									variant='text'
									size='small'
									sx={{ ml: 1 }}
								>
									Fazer Login
								</Button>
							</Box>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
}
