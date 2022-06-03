import React, { useState, useEffect } from 'react';
import _ from 'lodash';
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

export default function FourthPage() {
	const [data, setData] = useState([]);
	const [checked, setChecked] = useState([]);

	const [left, setLeft] = useState([]);
	const [right, setRight] = useState([]);

	useEffect(() => {
		service.fetchProfessores().then(res => {
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
				{customList('Lista de Professores', left)}
			</Grid>
			<Grid item xs={2}>
				<Grid container direction='column' alignItems='center'>
					<Button
						sx={{ my: 0.5 }}
						variant='outlined'
						size='small'
						onClick={handleCheckedRight}
						disabled={leftChecked.length === 0}
						aria-label='adicionar selecionados'
					>
						<ChevronRightRounded />
					</Button>
					<Button
						sx={{ my: 0.5 }}
						variant='outlined'
						size='small'
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
						aria-label='remover selecionados'
					>
						<ChevronLeftRounded />
					</Button>
				</Grid>
			</Grid>
			<Grid item xs={4}>
				{customList('Professores Adicionados', right)}
			</Grid>
		</Grid>
	);
}
