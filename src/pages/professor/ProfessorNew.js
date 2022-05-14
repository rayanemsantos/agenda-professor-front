import React, { useState, useEffect } from 'react';

import {
	Container,
	Button,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import InputMask from 'react-input-mask';
import { LocalizationProvider } from '@mui/lab';
import { grey } from '@mui/material/colors';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import * as service from '../../services/service';

export default function ProfessorNew(props) {
	const { history } = props;

	const add = () => {
		service
			.newProfessor(form)
			.then(res => {
				history.push('/professores');
			})
			.catch(err => {
				console.log(err);
			});
	};

	const edit = () => {
		service
			.editProfessor(form.id, form)
			.then(res => {
				history.push('/professores');
			})
			.catch(err => {
				console.log(err);
			});
	};

	const [form, setForm] = useState({
        "cpf": "67694184019",
        "formacao": "Licenciatura Letras Português",
        "address_street": "Rua A",
        "address_number": "2021",
        "address_district": "Barcher",
        "email":"rayane7",
        "name":"Eli Maria"
    });

	useEffect(() => {
		async function updateState() {
			const params = props.match.params;
			const { id } = params;

			if (id === 'new') {
			} else {
				service.fetchProfessor(id).then(res => {
					setForm(res.data);
				});
			}
		}

		updateState();
	}, [props.match.params]);

	return (
		<Container>
			<Paper sx={{ padding: 4 }}>
				<Typography variant='h5' sx={{ mt: 1 }}>
					{form.id ? 'Editar' : 'Cadastrar'}
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
								label='Número de matrícula'
								variant='outlined'
								type='text'
								name='registration_id'
								id='cadastro-registration_id'
								value={form.registration_id}
								disabled
								required
							/>
							<TextField
								label='Formação'
								variant='outlined'
								type='text'
								name='formacao'
								id='cadastro-formacao'
								value={form.formacao}
								required
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
							<TextField
                                label='CPF'
                                variant='outlined'
                                type='cpf'
                                name='cpf'
                                id='cadastro-cpf'
                                value={form.cpf}
                                onChange={e => setForm({ ...form, cpf: e.target.value })}
                                required
                            />    
							<TextField
								label='Nome Completo'
								variant='outlined'
								type='text'
								name='name'
								id='cadastro-name'
								value={form.name}
								onChange={e => setForm({ ...form, name: e.target.value })}
								required
							/>                                                 
							{/* TODO: Adicionar listas de Estado e Cidades */}
							<TextField
								label='Bairro'
								variant='outlined'
								type='text'
								name='address_district'
								id='cadastro-address_district'
								value={form.address_district}
								onChange={e =>
									setForm({ ...form, address_district: e.target.value })
								}
								required
							/>
							<TextField
								label='Rua'
								variant='outlined'
								type='text'
								name='address_street'
								id='cadastro-address_street'
								value={form.address_street}
								onChange={e =>
									setForm({ ...form, address_street: e.target.value })
								}
								required
							/>
							<TextField
								label='Número'
								variant='outlined'
								type='text'
								name='address_number'
								id='cadastro-address_number'
								value={form.address_number}
								onChange={e =>
									setForm({ ...form, address_number: e.target.value })
								}
								required
							/>
						</Stack>

                        
						<Container
							px='0'
							sx={{
								display: 'flex',
								gap: '0.5rem',
								alignItems: 'center',
								justifyContent: 'flex-end',
							}}
						>
							<Button
								className={'secondary-button'}
								onClick={() => history.goBack()}
								color='secondary'
								variant='outlined'
								size='large'
								sx={{ width: 'fit-content', my: 2 }}
							>
								Cancelar
							</Button>
							<Button
								className={'primary-button'}
								onClick={() => (form.id ? edit() : add())}
								color='primary'
								size='large'
								sx={{ width: 'fit-content', my: 2 }}
							>
								Salvar
							</Button>
						</Container>
					</Stack>
				</LocalizationProvider>
			</Paper>
		</Container>
	);
}
