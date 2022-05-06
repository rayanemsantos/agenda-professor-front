import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import InputMask from 'react-input-mask';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import { grey } from '@mui/material/colors';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import Layout from './../../Layout';
import * as services from '../../services/service';

export default function Aluno({ history }) {
	const user = useSelector(({ user }) => user);

	const add = () => {
		services
			.newStudent(form)
			.then(res => {
				history.push('/');
			})
			.catch(err => {
				console.log(err);
			});
	};

	const [form, setForm] = useState({
		full_name: '',
		// email: '',
		// serie: '',
		// ensino: '',
		dataNascimento: null,
		nomeResponsavel: '',
		parentesco: '',
		telefoneResponsavel: '',
		emailResponsavel: '',
		cpf: '',
		endereco: '',
		valid: true,
		errorMessage: '',
	});

	return (
		<Layout user={user} history={history} title='Aluno'>
			{/* TODO: Add avatar/photo upload */}
			<Paper sx={{ padding: 4 }}>
				<Typography variant='h5' sx={{ mt: 1 }}>
					Cadastrar
				</Typography>
				<Typography variant='body2' color={grey[600]}>
					Insira os dados de um novo aluno para cadastrá-lo.
				</Typography>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Stack
						component='form'
						className='Cadastro'
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
								name='full_name'
								id='cadastro-full_name'
								value={form.full_name}
								onChange={e =>
									setForm({ ...form, full_name: e.target.value })
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
								// helperText={errorMessage !== '' && message(errorMessage)}
								renderInput={params => (
									<TextField variant='outlined' {...params} />
								)}
								required
							/>
 							{/* <TextField
								label='Email'
								variant='outlined'
								type='email'
								name='email'
								id='cadastro-email'
								value={form.email}
								onChange={e => setForm({ ...form, email: e.target.value })}
								required
							/> */}
							{/* TODO: Adicionar listas de Estado e Cidades */}
							<TextField
								label='Endereço'
								variant='outlined'
								type='text'
								name='endereco'
								id='cadastro-endereco'
								value={form.endereco}
								onChange={e => setForm({ ...form, endereco: e.target.value })}
								required
							/>
						</Stack>
						<Stack className='endereco' spacing={2}>
							<Typography variant='button' sx={{ mb: '-.5rem' }}>
								Responsável
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
							{/* <TextField
								label='Parentesco'
								variant='outlined'
								type='text'
								name='parentesco'
								id='cadastro-parentesco'
								value={form.parentesco}
								onChange={e => setForm({ ...form, parentesco: e.target.value })}
								required
							/> */}
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
							{/* <TextField
								label='Email do Responsável'
								variant='outlined'
								type='email'
								name='email'
								id='cadastro-emailResponsavel'
								value={form.emailResponsavel}
								onChange={e =>
									setForm({ ...form, emailResponsavel: e.target.value })
								}
								required
							/> */}
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
						</Stack>
						<Button
							className={'primary-button'}
							style={{
								opacity: form.email === '' ? 0.5 : 1,
							}}
							disabled={form.email === ''}
							onClick={() => add()}
							color='primary'
							size='large'
							sx={{ width: 'fit-content', my: 2 }}
						>
							Cadastrar
						</Button>
					</Stack>
				</LocalizationProvider>
			</Paper>
		</Layout>
	);
}
