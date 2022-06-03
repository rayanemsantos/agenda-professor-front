import React, { useEffect, useState } from 'react';
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

export default function ThirdPage() {
	const [data, setData] = useState([]);
	const [checked, setChecked] = useState([]);
	const [left, setLeft] = useState([
		// 'Artes',
		// 'Biologia',
		// 'Ciências',
		// 'Educação física',
		// 'Espanhol',
		// 'Filosofia',
		// 'Física',
		// 'Geografia',
		// 'Gramática',
		// 'História',
		// 'Inglês',
		// 'Literatura',
		// 'Matemática',
		// 'Português',
		// 'Química',
		// 'Redação',
	]);

	const [right, setRight] = useState([]);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	useEffect(() => {
		service.fetchMaterias().then(res => {
			setData(res.data);
			setLeft(res.data);
		});
	}, []);

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
				} matérias selecionadas`}
			/>
			<Divider />
			<List
				sx={{
					height: 360,
					overflow: 'auto',
				}}
				dense
				component='div'
				role='list'
			>
				{items.map(value => {
					const labelId = `transfer-list-all-item-${value}-label`;

					return (
						<ListItem
							key={value}
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
							<ListItemText id={labelId} primary={value} />
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
				{customList('Lista de Matérias', left)}
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
				{customList('Matérias Adicionadas', right)}
			</Grid>
		</Grid>
	);
}