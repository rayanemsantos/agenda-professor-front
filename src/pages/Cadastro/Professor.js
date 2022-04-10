import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Box,
	Button,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import InputMask from 'react-input-mask';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import { grey } from '@mui/material/colors';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import Layout from './../../Layout';
// import * as services from '../../services/service';

export default function Professor({ history }) {
	const user = useSelector(({ user }) => user);

	const [form, setForm] = useState({
		nomeCompleto: '',
		dataNascimento: null,
		email: '',
		telefone: '',
		escolaridade: '',
		endereco: '',
		endereco2: '',
		endereco3: '',
		cpf: '',
		rg: '',
		pispasep: '',
		valid: true,
		errorMessage: '',
	});

	return (
		<Layout user={user} history={history} title='Professor'>
			{/* TODO: Add avatar/photo upload */}
			<Paper sx={{ padding: 4 }}>
				<Typography variant='h5' sx={{ mt: 1 }}>
					Cadastrar
				</Typography>
				<Typography variant='body2' color={grey[600]}>
					Insira os dados de um novo professor para cadastrá-lo.
				</Typography>
				<Box className='form' component='form'>
					<Stack className='Cadastro'>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<Stack
								component='form'
								className='input wrapper'
								spacing={4}
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
										onChange={e => setForm({ ...form, dataNascimento: e })}
										inputFormat='dd/MM/yyyy'
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
										onChange={e => setForm({ ...form, email: e.target.value })}
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
										type='text'
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
										Endereço
									</Typography>
									{/* TODO: Adicionar listas de Estado e Cidades */}
									<TextField
										label='Endereço'
										variant='outlined'
										type='text'
										name='endereco'
										id='cadastro-endereco'
										value={form.endereco}
										onChange={e =>
											setForm({ ...form, endereco: e.target.value })
										}
									/>
									<TextField
										label='Endereço 2'
										variant='outlined'
										type='text'
										name='endereco2'
										id='cadastro-endereco2'
										value={form.endereco2}
										onChange={e =>
											setForm({ ...form, endereco2: e.target.value })
										}
									/>
									<TextField
										label='Endereço 3'
										variant='outlined'
										type='text'
										name='endereco3'
										id='cadastro-endereco3'
										value={form.endereco3}
										onChange={e =>
											setForm({ ...form, endereco3: e.target.value })
										}
									/>
								</Stack>
								<Stack className='documentacao' spacing={2}>
									<Typography variant='button' sx={{ mb: '-.5rem' }}>
										Documentação
									</Typography>
									<InputMask
										mask='999.999.999-99'
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
							sx={{ my: 2 }}
						>
							Cadastrar
						</Button>
					</Stack>
				</Box>
			</Paper>
		</Layout>
	);
}
