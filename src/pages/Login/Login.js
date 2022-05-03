import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	Box,
	Button,
	Grid,
	Paper,
	Stack,
	TextField,
	Typography,
	ToggleButtonGroup,
	ToggleButton,
} from '@mui/material';

import Layout from '../../Layout';
// import * as authServices from '../../services/user.service';
import { setUserData } from '../store/user.reducer';

function Login({ history }) {
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		email: '',
		password: '',
		valid: true,
		errorMessage: '',
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [alignment, setAlignment] = useState('1');
	function login() {
		// let login =
		// 	alignment === '1' ? authServices.loginTeacher : authServices.loginStaff;
		dispatch(
			setUserData({
				id: 1,
				cpf: '06806761399',
				birth_date: '2022-03-18',
				avatar: null,
				job_title: 'SECRETÁRIO',
				creation_datetime: '2022-03-18T20:06:18.142111Z',
				edition_datetime: '2022-03-18T20:06:18.142121Z',
				user: {
					id: 1,
					username: 'Ariel Cavalcante',
					email: '',
					first_name: '',
				},
				type: 'secretaria',
			})
		);
		history.push('/');
		// login(form.email, form.password)
		// 	.then(res => {
		// 		// dispatch(setUserData({type: type, ...res.data}));

		// 		history.push('/');
		// 	})
		// 	.catch(err => {
		// 		setErrorMessage('Email ou senha inválido.');
		// 	});
	}
	const message = message => {
		return <Typography>{message}</Typography>;
	};
	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};
	return (
		<Layout history={history} hasTabs={false} user={false}>
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
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									mt: 3,
									mb: 3,
								}}
							>
								<ToggleButtonGroup
									color='primary'
									exclusive
									value={alignment}
									onChange={handleChange}
								>
									<ToggleButton value={'1'}>Professor</ToggleButton>
									<ToggleButton value={'2'}>Coordenação</ToggleButton>
								</ToggleButtonGroup>
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
									helperText={errorMessage !== '' && message(errorMessage)}
									required
								/>
							</Stack>

							<Button
								className={'primary-button'}
								style={{
									opacity: form.email === '' && form.password === '' ? 0.5 : 1,
								}}
								disabled={form.email === '' && form.password === ''}
								onClick={() => login()}
								color='primary'
								size='large'
								sx={{ mt: 2, mb: 4 }}
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
		</Layout>
	);
}

export default Login;
