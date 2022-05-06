import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import InputMask from 'react-input-mask';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import { grey } from '@mui/material/colors';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import Layout from './../../Layout';
import * as service from '../../services/service';

export default function AlunoNew(props) {
	const user = useSelector(({ user }) => user);
    const {history} = props

	const add = () => {
		service
			.newStudent(form)
			.then(res => {
				history.push('/alunos');
			})
			.catch(err => {
				console.log(err);
			});
	};

    const edit = () => {
		service
			.editStudent(form.id, form)
			.then(res => {
				history.push('/alunos');
			})
			.catch(err => {
				console.log(err);
			});
	};

	const [form, setForm] = useState({
        full_name: "",
        registration_id: "",
        responsible_name: "",
        responsible_contact: "",
        address_street: "",
        address_number: "",
        address_district: ""
    });


    useEffect(() => {
        async function updateState()
        {
            const params = props.match.params;
            const {id} = params;

            if ( id === 'new' )
            {
                
            }
            else
            {
                service.fetchStudent(id).then((res) => {
                    setForm(res.data)
                })

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
                    {/* <DatePicker
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
                    /> */}
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
                        label='Bairro'
                        variant='outlined'
                        type='text'
                        name='address_district'
                        id='cadastro-address_district'
                        value={form.address_district}
                        onChange={e => setForm({ ...form, address_district: e.target.value })}
                        required
                    />                    
                    <TextField
                        label='Rua'
                        variant='outlined'
                        type='text'
                        name='address_street'
                        id='cadastro-address_street'
                        value={form.address_street}
                        onChange={e => setForm({ ...form, address_street: e.target.value })}
                        required
                    />
                    <TextField
                        label='Número'
                        variant='outlined'
                        type='text'
                        name='address_number'
                        id='cadastro-address_number'
                        value={form.address_number}
                        onChange={e => setForm({ ...form, address_number: e.target.value })}
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
                        name='responsible_name'
                        id='cadastro-responsible_name'
                        value={form.responsible_name}
                        onChange={e =>
                            setForm({ ...form, responsible_name: e.target.value })
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
                        value={form.responsible_contact}
                        disabled={false}
                        maskChar=' '
                        onChange={e =>
                            setForm({
                                ...form,
                                responsible_contact: e.target.value,
                            })
                        }
                    >
                        {() => (
                            <TextField
                                label='Celular do Responsável'
                                variant='outlined'
                                type='text'
                                name='responsible_contact'
                                id='cadastro-responsible_contact'
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
                {/* <Stack className='documentacao' spacing={2}>
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
                </Stack> */}
                <Button
                    className={'primary-button'}
                    style={{
                        opacity: form.email === '' ? 0.5 : 1,
                    }}
                    disabled={form.email === ''}
                    onClick={() => form.id ? edit() : add()}
                    color='primary'
                    size='large'
                    sx={{ width: 'fit-content', my: 2 }}
                >
                    Salvar
                </Button>
            </Stack>
        </LocalizationProvider>
    </Paper>
    </Container>
	);
}
