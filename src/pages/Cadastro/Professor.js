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

export default function Professor() {
	console.log('oi')
	const [form, setForm] = useState({
		nomeCompleto: '',
		dataNascimento: '1',
		email: '',
		telefone: '',
		escolaridade: '',
		// estado: '',
		// cidade: '',
		endereco: '',
		cpf: '',
		rg: '',
		pispasep: '',
		valid: true,
		errorMessage: '',
	});

	return (
		<>
			<HeaderComponent hasMenu />
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
							Professor
						</Typography>
						<Typography variant='body2'>
							Insira os dados de um novo professor para cadastrá-lo.
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
												required
											/>
											<InputMask
												mask='(85) \9 9999 9999'
												value={form.telefone}
												disabled={false}
												maskChar=' '
												onChange={e =>
													setForm({
														...form,
														telefone: e.target.value,
													})
												}
											>
												{() => (
													<TextField
														label='Celular'
														variant='outlined'
														type='text'
														name='telefone'
														id='cadastro-telefone'
														required
													/>
												)}
											</InputMask>
											<TextField
												label='Escolaridade'
												variant='outlined'
												type='escolaridade'
												name='escolaridade'
												id='cadastro-escolaridade'
												value={form.escolaridade}
												onChange={e =>
													setForm({ ...form, escolaridade: e.target.value })
												}
											/>
										</Stack>
										<Stack className='endereco' spacing={2}>
											<Typography variant='button' sx={{ mb: '-.5rem' }}>
												Endereco
											</Typography>
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
											<InputMask
												// mask='999 999 999-99'
												value={form.rg}
												disabled={false}
												maskChar=' '
												onChange={e =>
													setForm({
														...form,
														rg: e.target.value,
													})
												}
											>
												{() => (
													<TextField
														label='RG'
														variant='outlined'
														type='text'
														name='rg'
														id='cadastro-rg'
														required
													/>
												)}
											</InputMask>
											<InputMask
												mask='999.9999.999-9'
												value={form.pis}
												disabled={false}
												maskChar=' '
												onChange={e =>
													setForm({
														...form,
														pis: e.target.value,
													})
												}
											>
												{() => (
													<TextField
														label='PIS/PASEP'
														variant='outlined'
														type='text'
														name='pis'
														id='cadastro-pis'
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
									Cadastrar Aluno
								</Button>
							</Stack>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
}
