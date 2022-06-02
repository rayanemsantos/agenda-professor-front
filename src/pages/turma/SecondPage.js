import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	CardHeader,
	Checkbox,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
} from '@mui/material';
import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';
import _ from 'lodash';

import * as service from '../../services/service';

function not(a, b) {
	return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter(value => b.indexOf(value) !== -1);
}

function union(a, b) {
	return [...a, ...not(b, a)];
}

export default function AlunoList() {
	const [data, setData] = useState([]);
	const [checked, setChecked] = useState([]);

	const [left, setLeft] = useState([]);
	const [right, setRight] = useState([]);

	useEffect(() => {
		service.fetchStudents().then(res => {
			setData(res.data);
			setLeft(res.data);
		});
	}, []);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const numberOfChecked = items => intersection(checked, items).length;

	const handleToggleAll = items => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	const customList = (title, items) => (
		<Box>
			<CardHeader
				sx={{ px: 2, py: 1 }}
				avatar={
					<Checkbox
						onClick={handleToggleAll(items)}
						checked={
							numberOfChecked(items) === items.length && items.length !== 0
						}
						indeterminate={
							numberOfChecked(items) !== items.length &&
							numberOfChecked(items) !== 0
						}
						disabled={items.length === 0}
						inputProps={{
							'aria-label': 'todos os itens selecionados',
						}}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${
					items.length
				} alunos selecionados`}
			/>
			<Divider />
			<List
				sx={{
					height: 300,
					bgcolor: 'background.paper',
					overflow: 'auto',
				}}
				dense
				component='div'
				role='list'
			>
				{items.map(value => {
					const labelId = `transfer-list-all-item-${value.registration_id}-label`;

					return (
						<ListItem
							key={value.registration_id}
							role='listitem'
							button
							onClick={handleToggle(value)}
						>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{
										'aria-labelledby': labelId,
									}}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={value.full_name} />
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Box>
	);

	return (
		<Grid container spacing={2} justifyContent='center' alignItems='center'>
			<Grid item xs={4}>
				{customList('Lista de Alunos', left)}
			</Grid>
			<Grid item xs={2}>
				<Grid container direction='column' alignItems='center'>
					<Button
						sx={{ my: 0.5 }}
						variant='outlined'
						size='small'
						onClick={handleCheckedRight}
						disabled={leftChecked.length === 0}
						aria-label='adicionar selecionadas'
					>
						<ChevronRightRounded />
					</Button>
					<Button
						sx={{ my: 0.5 }}
						variant='outlined'
						size='small'
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
						aria-label='remover selecionadas'
					>
						<ChevronLeftRounded />
					</Button>
				</Grid>
			</Grid>
			<Grid item xs={4}>
				{customList('Alunos Adicionados', right)}
			</Grid>
		</Grid>
	);
}

// import React, { useEffect, useState } from 'react';

// import { grey } from '@mui/material/colors';

// import {
// 	Avatar,
// 	Box,
// 	Card,
// 	CardContent,
// 	Container,
// 	Divider,
// 	Grid,
// 	IconButton,
// 	List,
// 	ListItem,
// 	Pagination,
// 	Toolbar,
// 	TextField,
// 	Typography,
// } from '@mui/material';
// import { AddRounded, DeleteRounded, PersonRounded } from '@mui/icons-material';

// import * as service from '../../services/service';

// export default function AlunoList(props) {
// 	const { history } = props;
// 	const [data, setData] = useState([]);
// 	const [items, setItems] = useState([]);
// 	const [searchText, setSearchText] = useState('');
// 	const [page, setPage] = useState(0);
// 	const rowsPerPage = 10;

// 	useEffect(() => {
// 		service.fetchStudents().then(res => {
// 			setData(res.data);
// 			setItems(res.data);
// 		});
// 	}, []);

// 	useEffect(() => {
// 		setItems(
// 			searchText.length === 0
// 				? data
// 				: _.filter(
// 						data,
// 						item =>
// 							item.full_name &&
// 							item.full_name.toLowerCase().includes(searchText.toLowerCase())
// 				  )
// 		);
// 	}, [items, searchText]);

// 	function handleNew() {
// 		history.push('/aluno/new');
// 	}
// 	function handleEdit(id) {
// 		history.push('/aluno/' + id);
// 	}
// 	function paginate(event, page) {
// 		setPage(page - 1);
// 	}
// 	const [addedStudents, setAddedStudents] = useState([]);

// 	function handleAddStudent(item) {
// 		setAddedStudents(item);
// 		console.log(addedStudents);
// 	}

// 	return (
// 		<>
// 			<List>
// 				{items
// 					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// 					.map(_item => {
// 						return (
// 							<ListItem key={uuid()}>
// 								<Card className='w-full'>
// 									<CardContent>
// 										<Box className='flex justify-between items-center'>
// 											<Box className='flex'>
// 												<Avatar>
// 													<PersonRounded />
// 												</Avatar>
// 												<Box className='pl-5'>
// 													<Typography
// 														variant='body1'
// 														sx={{ fontWeight: 'bold' }}
// 													>
// 														{_item.full_name}
// 													</Typography>
// 													<Typography
// 														variant='body2'
// 														sx={{ fontWeight: 'bold' }}
// 														color={grey[600]}
// 													>
// 														{_item.registration_id}
// 													</Typography>
// 													<Typography variant='body2'>
// 														{_item.school_class}
// 													</Typography>
// 												</Box>
// 											</Box>

// 											<IconButton
// 												color='primary'
// 												onClick={() => handleAddStudent(_item)}
// 											>
// 												<AddRounded />
// 											</IconButton>
// 										</Box>
// 									</CardContent>
// 								</Card>
// 							</ListItem>
// 						);
// 					})}
// 				{!items.length ? (
// 					<ListItem>
// 						<Typography sx={{ fontSize: 18 }} color='text.primary' gutterBottom>
// 							Nenhum encontrado
// 						</Typography>
// 					</ListItem>
// 				) : null}
// 			</List>
// 			<Pagination
// 				onChange={paginate}
// 				page={page + 1}
// 				count={parseInt(items.length / 10)}
// 				color='primary'
// 			/>
// 		</>
// 	);
// }
