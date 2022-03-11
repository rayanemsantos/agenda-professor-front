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

function Login({ history }) {
	const [form, setForm] = useState({
		email: '',
		password: '',
		valid: true,
		errorMessage: '',
	});
	const [errorMessage, setErrorMessage] = useState('');

	const checkEmail = () => {
		services
			.login(form.email, form.password)
			.then(res => {
				localStorage.setItem('user', JSON.stringify(res.data));
				history.push('/');
			})
			.catch(err => {
				// console.log(err)
				setErrorMessage('Email ou senha inválido.');
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
						<Box className='form'>
							<Stack className='login' component='form'>
								<Box className='text wrapper'>
									<Typography variant='h2'>Login</Typography>
									<Typography variant='body2'>
										Faça login ou cadastre-se colocando seu email.
									</Typography>
								</Box>

								<Stack className='input wrapper' spacing={2} sx={{ mt: 2 }}>
									<TextField
										label='email'
										type='email'
										name='email'
										id='cadastro-email'
										value={form.email}
										onChange={e => setForm({ ...form, email: e.target.value })}
										required
									/>
									<TextField
										label='password'
										type='password'
										name='password'
										id='cadastro-password'
										value={form.password}
										onChange={e =>
											setForm({ ...form, password: e.target.value })
										}
										helperText={errorMessage !== '' && message(errorMessage)}
										required
									/>
								</Stack>

								<Button
									className={'primary-button'}
									style={{
										opacity:
											form.email === '' && form.password === '' ? 0.5 : 1,
									}}
									disabled={form.email === '' && form.password === ''}
									color='primary'
									size='large'
									sx={{ mt: 2, mb: 4 }}
									onClick={() => checkEmail()}
								>
									login
								</Button>
							</Stack>
							<Box alignItems='center' sx={{ width: 'fit-content' }} m='auto'>
								<Typography
									component='span'
									variant='body2'
									className='no-account'
								>
									Não tem conta?
								</Typography>
								<Button
									id='google-btn'
									className='primary-button'
									onClick={() => history.push('/cadastro')}
									color='primary'
									variant='text'
									size='small'
									sx={{ ml: 1 }}
								>
									Cadastrar
								</Button>
							</Box>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
}

export default Login;
