import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';

import { grey } from '@mui/material/colors';

import {
	Avatar,
	Box,
	Card,
	CardContent,
	Container,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	Pagination,
	Toolbar,
	TextField,
	Typography,
} from '@mui/material';
import { AddRounded, DeleteRounded, PersonRounded } from '@mui/icons-material';

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
	const [addedStudents, setAddedStudents] = useState([]);

	function handleAddStudent(item) {
		setAddedStudents(item);
		console.log(addedStudents);
	}

	return (
		<>
			{addedStudents && (
				<>
					<Typography variant='h6'>Alunos adicionados</Typography>
					<List>
						{addedStudents.map(_item => {
							return (
								<ListItem key={uuid()}>
									<Card className='w-full'>
										<CardContent>
											<Box className='flex justify-between items-center'>
												<Box className='flex'>
													<Avatar>
														<PersonRounded />
													</Avatar>
													<Box className='pl-5'>
														<Typography
															variant='body1'
															sx={{ fontWeight: 'bold' }}
														>
															{_item.full_name}
														</Typography>
														<Typography
															variant='body2'
															sx={{ fontWeight: 'bold' }}
															color={grey[600]}
														>
															{_item.registration_id}
														</Typography>
														<Typography variant='body2'>
															{_item.school_class}
														</Typography>
													</Box>
												</Box>

												<IconButton
													color='primary'
													// onClick={() => handleEdit(_item.id)}
												>
													<DeleteRounded />
												</IconButton>
											</Box>
										</CardContent>
									</Card>
								</ListItem>
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
					<Divider />
				</>
			)}

			<List>
				{items
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map(_item => {
						return (
							<ListItem key={uuid()}>
								<Card className='w-full'>
									<CardContent>
										<Box className='flex justify-between items-center'>
											<Box className='flex'>
												<Avatar>
													<PersonRounded />
												</Avatar>
												<Box className='pl-5'>
													<Typography
														variant='body1'
														sx={{ fontWeight: 'bold' }}
													>
														{_item.full_name}
													</Typography>
													<Typography
														variant='body2'
														sx={{ fontWeight: 'bold' }}
														color={grey[600]}
													>
														{_item.registration_id}
													</Typography>
													<Typography variant='body2'>
														{_item.school_class}
													</Typography>
												</Box>
											</Box>

											<IconButton
												color='primary'
												onClick={() => handleAddStudent(_item)}
											>
												<AddRounded />
											</IconButton>
										</Box>
									</CardContent>
								</Card>
							</ListItem>
						);
					})}
				{!items.length ? (
					<ListItem>
						<Typography sx={{ fontSize: 18 }} color='text.primary' gutterBottom>
							Nenhum encontrado
						</Typography>
					</ListItem>
				) : null}
			</List>
			<Pagination
				onChange={paginate}
				page={page + 1}
				count={parseInt(items.length / 10)}
				color='primary'
			/>
		</>
	);
}
