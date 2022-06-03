import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';

import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Grid,
	List,
	ListItem,
	Pagination,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import { Edit } from '@mui/icons-material';

import * as service from '../../services/service';

export default function TurmaList(props) {
	const { history } = props;
	const [data, setData] = useState([]);
	const [items, setItems] = useState([]);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		service.fetchTurmas().then(res => {
			setData(res.data);
			setItems(res.data);
		});
	}, []);

	useEffect(() => {
		setItems(
			searchText.length === 0
				? data
				: _.filter(data, item =>
						item.full_name.toLowerCase().includes(searchText.toLowerCase())
				  )
		);
	}, [items, searchText]);

	function handleNew() {
		history.push('/turma/new');
	}
	function handleEdit(id) {
		history.push('/turma/' + id);
	}

	const item = _item => {
		return (
			<ListItem>
				<Card className='w-full'>
					<CardContent>
						<Box className='flex justify-between items-center'>
							<Box className='flex'>
								<Box className='pl-5 inline'>
									<Typography variant='h6'>
										{_item.serie.slice(0, 1)}ª série {_item.identification}
									</Typography>
									<Typography
										variant='body2'
										sx={{ textTransform: 'capitalize' }}
									>
										{_item.shift.toLowerCase()}
									</Typography>
								</Box>
							</Box>

							<Button
								endIcon={<Edit />}
								variant='outlined'
								color='primary'
								onClick={() => handleEdit(_item.id)}
							>
								Editar
							</Button>
						</Box>
					</CardContent>
				</Card>
			</ListItem>
		);
	};

	return (
		<>
			<Container>
				<Card style={{ width: '100%' }}>
					<CardContent>
						<Typography
							sx={{ fontSize: 25 }}
							color='text.primary'
							px='.25rem'
							gutterBottom
						>
							Turmas
						</Typography>
						<Toolbar>
							<Grid container justifyContent='between' spacing={3}>
								<Grid item md={10}>
									<TextField
										fullWidth
										variant='outlined'
										color='primary'
										id='outlined-search'
										label='Pesquise'
										type='search'
										onChange={ev => setSearchText(ev.target.value)}
									/>
								</Grid>
								<Grid item md={2}>
									<Button onClick={() => handleNew()}>Adicionar nova</Button>
								</Grid>
							</Grid>
						</Toolbar>
						<List>
							{items.map(_item => {
								return (
									<React.Fragment key={uuid()}>{item(_item)}</React.Fragment>
								);
							})}
							{!items.length ? (
								<ListItem>
									<Typography
										sx={{ fontSize: 14 }}
										color='text.primary'
										gutterBottom
									>
										Nenhuma turma encontrada
									</Typography>
								</ListItem>
							) : null}
						</List>
						<Pagination
							count={1}
							color='primary'
							sx={{ justifyContent: 'flex-end' }}
						/>
					</CardContent>
				</Card>
			</Container>
			{/* <Fab 
        sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(5),
            right: (theme) => theme.spacing(5)
          }}
        color="primary"
        aria-label="add" 
        >
        <AddIcon />
    </Fab>   */}
		</>
	);
}
