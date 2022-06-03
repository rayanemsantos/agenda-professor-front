import React, { useEffect, useState } from 'react';
import _ from 'lodash';
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

export default function ProfessorList(props) {
	const { history } = props;
	const [data, setData] = useState([]);
	const [items, setItems] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [page, setPage] = useState(0);
	const rowsPerPage = 10;

	useEffect(() => {
		service.fetchProfessores().then(res => {
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
		history.push('/professores/new');
	}
	function handleEdit(id) {
		history.push('/professores/' + id);
	}
	function paginate(event, page) {
		setPage(page - 1);
	}
	const item = _item => {
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
									<span>{_item.formacao}</span>
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
							Professores
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
								return <>{item(_item)}</>;
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
		</>
	);
}
