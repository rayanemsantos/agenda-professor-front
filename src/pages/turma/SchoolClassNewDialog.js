import React, { useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	OutlinedInput,
	Typography,
	Toolbar,
	IconButton
} from '@mui/material';
import { DragHandleRounded, CloseRounded, ClosedCaption } from '@mui/icons-material';
import * as service from '../../services/service';
import feedbackService from '../../services/feedbackService';

function SchoolClassNewDialog({
	open,
	close,
	usuario,
	onCreate
}) {
	const nodeRef = React.useRef(null);
	
	const [form, setForm] = useState({
		id: '',
		serie: '',
		identification: '',
		shift: '',
	});
	const series = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const salas = ['A', 'B', 'C', 'D'];
	const turnos = ['Manhã', 'Tarde', 'Noite'];

	const handleCreate = () => {
		service.newTurmas(form).then((res) => {
			feedbackService.showMessage('Turma cadastrada com sucesso!', 'success')
			onCreate(res.data)
		}).catch((err) => {
			console.log('err', err)
			feedbackService.showMessage('Ops! Houve um erro ao cadastrar turma.', 'error')
		})
	}

	return (
		open && (
			<Grid container>
				<Grid item xs={12} md={8} lg={6}>
					<Dialog
						ref={nodeRef}
						open={open}
						onClose={close}
						usuario={usuario}
						maxWidth='sm'
						fullWidth
						aria-labelledby='draggable-dialog-title'
					>
					<DialogTitle sx={{ m: 0, p: 2 }}>
					Nova turma
					</DialogTitle>
					<DialogContent
							sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
						>
						<FormControl>
							<InputLabel id='cadastro-serie'>Série</InputLabel>
							<Select
								label='Série'
								variant='outlined'
								type='text'
								name='serie'
								id='cadastro-serie'
								value={form.serie}
								onChange={e => setForm({ ...form, serie: e.target.value })}
								input={<OutlinedInput label='Série' />}
								required
							>
								{series.map(serie => (
									<MenuItem key={serie} value={serie}>
										{serie}ª série
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl>
							<InputLabel id='cadastro-identification'>Sala</InputLabel>
							<Select
								label='Sala'
								variant='outlined'
								type='text'
								name='identification'
								id='cadastro-identification'
								value={form.identification}
								onChange={e => setForm({ ...form, identification: e.target.value })}
								input={<OutlinedInput label='Sala' />}
								required
							>
								{salas.map(sala => (
									<MenuItem key={sala} value={sala}>
										{sala}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl>
							<InputLabel id='cadastro-shift'>Turno</InputLabel>
							<Select
								label='Turno'
								variant='outlined'
								type='text'
								name='shift'
								id='cadastro-shift'
								value={form.shift}
								onChange={e => setForm({ ...form, shift: e.target.value })}
								input={<OutlinedInput label='Turno' />}
								required
							>
								{turnos.map(turno => (
									<MenuItem key={turno} value={turno.toUpperCase()}>
										{turno}
									</MenuItem>
								))}
							</Select>
						</FormControl>							
						</DialogContent>
						<DialogActions mt={3}>
							<Button variant='text' onClick={close}>
								Cancelar
							</Button>
							<Button onClick={handleCreate}>Salvar</Button>
						</DialogActions>
					</Dialog>
				</Grid>
			</Grid>
		)
	);
}

export default SchoolClassNewDialog;
