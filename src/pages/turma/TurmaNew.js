import React, { useState, useEffect } from 'react';

import {
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Stack,
	OutlinedInput,
	Step,
	Stepper,
	StepLabel,
	Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import { grey } from '@mui/material/colors';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import * as service from '../../services/service';

import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import ThirdPage from './ThirdPage';
import FourthPage from './FourthPage';

export default function TurmaNew(props) {
	const { history } = props;

	// const add = () => {
	// 	service
	// 		.newTurmas(form)
	// 		.then(res => {
	// 			history.push('/turmas');
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		});
	// };

	// const edit = () => {
	// 	service
	// 		.editTurmas(form.id, form)
	// 		.then(res => {
	// 			history.push('/turmas');
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		});
	// };

	const [form, setForm] = useState({
		id: '',
		serie: '',
		identification: '',
		shift: '',
	});
	let [currentPage, setCurrentPage] = useState(0);

	const pages = [
		'Criar Turma',
		'Adicionar Alunos',
		'Adicionar Matérias',
		'Adicionar Professores',
	];

	useEffect(() => {
		async function updateState() {
			const params = props.match.params;
			const { id } = params;

			if (id === 'new') {
			} else {
				service.fetchTurmas(id).then(res => {
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
					{pages[currentPage]}
				</Typography>
				<Typography variant='body2' color={grey[600]}>
					Crie uma turma e adicione estudantes, matérias e professores
				</Typography>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<Stack
						component='form'
						className='Cadastro'
						spacing={4}
						sx={{ my: 2 }}
					>
						<Stepper activeStep={currentPage} alternativeLabel>
							{pages.map(label => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
						{currentPage === 0 && <FirstPage />}
						{currentPage === 1 && <SecondPage />}
						{currentPage === 2 && <ThirdPage />}
						{currentPage === 3 && <FourthPage />}
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
							onClick={() => setCurrentPage(currentPage--)}
							color='secondary'
							variant='outlined'
							size='large'
							sx={{ width: 'fit-content', my: 2 }}
						>
							Voltar
						</Button>
						<Button
							className={'primary-button'}
							onClick={() => setCurrentPage(currentPage++)}
							color='primary'
							size='large'
							sx={{ width: 'fit-content', my: 2 }}
						>
							Próximo
						</Button>
					</Container>
				</LocalizationProvider>
			</Paper>
		</Container>
	);
}
