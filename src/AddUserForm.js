import React, {useState, useRef, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';

export const AddUserForm = (props) => {
    const useStyles = makeStyles({
        root: {
            marginBottom: '1rem',    
            width: '100%',
        },
        btn: {
            width: 'fit-content',
            marginBottom: '10px',
        },
    });
    const classes = useStyles();

    const defaultState = {
        id: '',
        name: '',
        email: '',
    }
    const [person, setPerson] = useState(defaultState)

    const refContainer = useRef(null)
    useEffect(() => {
        refContainer.current.focus()
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setPerson({...person, [name]: value})
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        props.addUser(person)
        document.getElementById("AddUserForm").reset();
        
    }
    
    
    return (
        <form onSubmit={handleSubmit}  id='AddUserForm'>
        <div>
            <TextField className={classes.root} type='text' name='name' value={props.name} onChange={handleChange} label="Username" variant="outlined" ref={refContainer} required />
        </div>
        <div>
            <TextField className={classes.root} type='email' name='email' value={props.email} onChange={handleChange} label="Email" variant="outlined" required />
        </div>
        <div>
            <Button type='submit' variant='contained' size='large' color='primary' className={classes.btn} startIcon={<PersonAddOutlinedIcon />}>
            <Typography variant='button'>
                Add User
            </Typography>
            </Button>
        </div>
        </form>
    )
}