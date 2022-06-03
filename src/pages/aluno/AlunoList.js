import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';

import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import {
	Pagination,
	Card,
	CardContent,
	Typography,
	Toolbar,
	TextField,
	Button,
	Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import * as service from '../../services/service';

export default function AlunoList(props) {
	const { history } = props;
	const [data, setData] = useState([]);
	const [items, setItems] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [page, setPage] = useState(0);
	const rowsPerPage = 10;

	useEffect(() => {
		service.fetchStudents().then(res => {
			setData(res.data);
			setItems(res.data);
		});
	}, []);

	useEffect(() => {
		setItems(
			searchText.length === 0
				? data
				: _.filter(
						data,
						item =>
							item.full_name &&
							item.full_name.toLowerCase().includes(searchText.toLowerCase())
				  )
		);
	}, [items, searchText]);

	function handleNew() {
		history.push('/aluno/new');
	}
	function handleEdit(id) {
		history.push('/aluno/' + id);
	}
	function paginate(event, page) {
		setPage(page - 1);
	}

	const studentList = _item => {
		return (
			<ListItem>
				<Card className='w-full'>
					<CardContent>
						<div className='flex justify-between items-center'>
							<div className='flex'>
								<Avatar>
									<PersonIcon />
								</Avatar>
								<div className='pl-5'>
									<h3>{_item.full_name}</h3>
									<h5>{_item.registration_id}</h5>
									<span>{_item.school_class}</span>
								</div>
							</div>

							<Button
								endIcon={<EditIcon />}
								variant='outlined'
								color='primary'
								onClick={() => handleEdit(_item.id)}
							>
								Editar
							</Button>
						</div>
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
						<Typography sx={{ fontSize: 25 }} color='text.primary' gutterBottom>
							Alunos
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
									<Button onClick={() => handleNew()}>Adicionar novo</Button>
								</Grid>
							</Grid>
						</Toolbar>
						<List>
							{items
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(_item => {
									return (
										<React.Fragment key={uuid()}>
											{studentList(_item)}
										</React.Fragment>
									);
								})}
							{!items.length ? (
								<ListItem>
									<Typography
										sx={{ fontSize: 18 }}
										color='text.primary'
										gutterBottom
									>
										Nenhum encontrado
									</Typography>
								</ListItem>
							) : null}
						</List>
						<Pagination
							onChange={paginate}
							page={page + 1}
							count={Math.ceil(items.length / 10)}
							color='primary'
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
