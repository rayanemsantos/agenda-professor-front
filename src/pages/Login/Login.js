import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Box,
	Button,
	Grid,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';

import * as authServices from '../../services/user.service';
import { setUserData } from '../store/user.reducer';
import feedbackService from '../../services/feedbackService';

function Login({ history }) {
	const dispatch = useDispatch();
	
	const user = useSelector(({ user }) => user);
	const [form, setForm] = useState({
		email: '',
		password: '',
		valid: true,
		errorMessage: '',
	});

	function login() {
		authServices.loginStaff(form.email, form.password)
			.then(res => {
				dispatch(setUserData({type: '2', ...res.data}));
				window.localStorage.setItem('access', res.data.access);
				window.localStorage.setItem('refresh', res.data.refresh);
			})
			.catch(err => {
				feedbackService.showMessage('Email ou senha inválido.', 'error');
			});
	}

	return (
		<Grid item sx={{ width: 424, padding: 2, mx: 'auto' }}>
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
								label='username'
								name='username'
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
								onChange={e => setForm({ ...form, password: e.target.value })}
								required
							/>
						</Stack>

						<Button
							className={'primary-button'}
							style={{
								opacity: form.email === '' && form.password === '' ? 0.5 : 1,
							}}
							disabled={form.email === '' || form.password === ''}
							onClick={() => login()}
							color='primary'
							size='large'
							sx={{ mt: 2, mb: 4 }}
						>
							login
						</Button>
					</Stack>
					{/* <Box alignItems='center' sx={{ width: 'fit-content' }} m='auto'>
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
					</Box> */}
				</Box>
			</Paper>
		</Grid>
	);
}

export default Login;
