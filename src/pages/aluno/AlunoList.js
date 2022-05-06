import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Paper from '@mui/material/Paper';
import { Pagination, Card, CardContent, CardHeader, Typography, IconButton, Toolbar, TextField, Box, Button, Grid } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import * as service from '../../services/service';

const rows = [
  {name:'Frozen yoghurt'},
  {name:'Ice cream sandwich'},
  {name:'Eclair'},
  {name:'Cupcake'},
  {name:'Gingerbread'}
];

const useStyles = makeStyles(theme => ({
    card          : {
        display: 'flex'
    },
    cardText   : {
        paddingLeft: '12px'
    },
    cardContainer : {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

export default function AlunoList(props) {
    const {history} = props;
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        service.fetchStudents().then((res) => {
            setData(res.data);
            setItems(res.data);
        })
    }, [])

    useEffect(() => {
        setItems(searchText.length === 0 ? data : _.filter(data, item => item.full_name.toLowerCase().includes(searchText.toLowerCase())))
    }, [items, searchText]);

    function handleNew(){
        history.push('/aluno/new')
    }
    function handleEdit(id){
        history.push('/aluno/' + id)
    }
    const item = (_item) => {
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
                            <Button endIcon={<EditIcon />} variant="outlined" color="primary" onClick={() => handleEdit(_item.id)}> 
                                Editar
                            </Button>
                        </div>
                    </CardContent>
                </Card>            
            </ListItem>
        )
    }

    return (
    <>
    <Container>
        <Card style={{width:'100%'}}>
            <CardContent>
                <Typography sx={{ fontSize: 25 }} color="text.primary" gutterBottom>
                    Alunos
                </Typography>     
                <Toolbar>
                <Grid container justifyContent="between" spacing={3}>
                    <Grid item md={10}>
                        <TextField fullWidth 
                                    variant="outlined" 
                                    color="primary" 
                                    id="outlined-search" 
                                    label="Pesquise" 
                                    type="search"
                                    onChange={(ev) => setSearchText(ev.target.value)} />
                    </Grid>                    
                    <Grid item md={2}>
                        <Button onClick={() => handleNew()}>Adicionar novo</Button>
                    </Grid>
                </Grid>
                </Toolbar>       
                <List>
                    {
                        items.map((_item) => {
                            return (
                                <>{item(_item)}</>
                            )
                        })
                    }   
                    {!items.length ? (
                        <ListItem>
                            <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                                Nenhum encontrado
                            </Typography>  
                        </ListItem>
                    ):null}      
                </List>
                <Pagination count={1} color="primary" />
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