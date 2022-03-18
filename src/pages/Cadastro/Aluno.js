import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Grid,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import InputMask from 'react-input-mask';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from 'moment';
import 'moment/locale/pt-br';

import HeaderComponent from './../../components/HeaderComponent';
// import * as services from '../../services/service';

export default function Aluno({history}) {
	const [form, setForm] = useState({
		nomeCompleto: '',
		email: '',
		serie: '',
		ensino: '',
		dataNascimento: '1990-01-01',
		nomeResponsavel: '',
		telefoneResponsavel: '',
		emailResponsavel: '',
		cpf: '',
		endereco: '',
		valid: true,
		errorMessage: '',
	});

	return (
		<>
			<HeaderComponent hasMenu history={history}/>
			<Grid
				container
				alignItems='center'
				justifyContent='center'
				sx={{ my: 3 }}
			>
				<Grid item sx={{ width: '80%', padding: 2 }}>
					<Box className='content-header' sx={{ mb: 2 }}>
						<Typography variant='h4' sx={{ mt: 3 }}>
							Cadastro
						</Typography>
						<Typography variant='overline' className='subtitle hora'>
							{moment().format('dddd, DD MMM, LT')}
						</Typography>
					</Box>
					<Paper sx={{ padding: 3 }}>
						<Typography variant='h5' sx={{ mt: 3 }}>
							Aluno
						</Typography>
						<Typography variant='body2'>
							Insira os dados de um novo aluno para cadastrá-lo.
						</Typography>
						<Box className='form' component='form'>
							<Stack className='Cadastro'>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<Stack
										component='form'
										className='input wrapper'
										spacing={2}
										sx={{ mt: 2 }}
									>
										<Stack className='dados-pessoais' spacing={2}>
											<Typography variant='button' sx={{ mb: '-.5rem' }}>
												Dados Pessoais
											</Typography>
											<TextField
												label='Nome Completo'
												variant='outlined'
												type='text'
												name='nomeCompleto'
												id='cadastro-nomeCompleto'
												value={form.nomeCompleto}
												onChange={e =>
													setForm({ ...form, nomeCompleto: e.target.value })
												}
												required
											/>
											<DatePicker
												label='Data de Nascimento'
												variant='outlined'
												type='date'
												name='dataNascimento'
												id='cadastro-dataNascimento'
												value={form.dataNascimento}
												onChange={e =>
													setForm({ ...form, dataNascimento: e.target.value })
												}
												required
												// helperText={errorMessage !== '' && message(errorMessage)}
												renderInput={params => (
													<TextField variant='outlined' {...params} />
												)}
											/>
											<TextField
												label='Email'
												variant='outlined'
												type='email'
												name='email'
												id='cadastro-email'
												value={form.email}
												onChange={e =>
													setForm({ ...form, email: e.target.value })
												}
											/>
											<TextField
												label='Endereço'
												variant='outlined'
												type='endereco'
												name='endereco'
												id='cadastro-endereco'
												value={form.endereco}
												onChange={e =>
													setForm({ ...form, endereco: e.target.value })
												}
											/>
										</Stack>
										<Stack className='endereco' spacing={2}>
											<Typography variant='button' sx={{ mb: '-.5rem' }}>
												Dados do Responsável
											</Typography>
											<TextField
												label='Nome do Responsável'
												variant='outlined'
												type='text'
												name='nomeResponsavel'
												id='cadastro-nomeResponsavel'
												value={form.nomeResponsavel}
												onChange={e =>
													setForm({ ...form, nomeResponsavel: e.target.value })
												}
												required
											/>
											<InputMask
												mask='(85) \9 9999 9999'
												value={form.telefoneResponsavel}
												disabled={false}
												maskChar=' '
												onChange={e =>
													setForm({
														...form,
														telefoneResponsavel: e.target.value,
													})
												}
											>
												{() => (
													<TextField
														label='Celular do Responsável'
														variant='outlined'
														type='text'
														name='telefoneResponsavel'
														id='cadastro-telefoneResponsavel'
														required
													/>
												)}
											</InputMask>
											<TextField
												label='Email do Responsável'
												variant='outlined'
												type='email'
												name='email'
												id='cadastro-emailResponsavel'
												value={form.emailResponsavel}
												onChange={e =>
													setForm({ ...form, emailResponsavel: e.target.value })
												}
											/>
										</Stack>
										<Stack className='documentacao' spacing={2}>
											<Typography variant='button' sx={{ mb: '-.5rem' }}>
												Documentação
											</Typography>
											<InputMask
												mask='999 999 999-99'
												value={form.cpf}
												disabled={false}
												maskChar=' '
												onChange={e =>
													setForm({
														...form,
														cpf: e.target.value,
													})
												}
											>
												{() => (
													<TextField
														label='CPF'
														variant='outlined'
														type='text'
														name='cpf'
														id='cadastro-cpf'
														required
													/>
												)}
											</InputMask>
										</Stack>
									</Stack>
								</LocalizationProvider>
								<Button
									className={'primary-button'}
									style={{
										opacity: form.email === '' ? 0.5 : 1,
									}}
									disabled={form.email === ''}
									// onClick={() => checkEmail()}
									// RAY: metodo de criar o aluno aqui
									color='primary'
									size='large'
									sx={{ mt: 2, mb: 4 }}
								>
									Cadastrar
								</Button>
							</Stack>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
}
