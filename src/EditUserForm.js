import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

export const EditUserForm = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
        '& .MuiTextField-root': {
            marginBottom: '1rem',
            width: '100%',
        },
        },
        btn: {
            width: 'fit-content',
            marginBottom: '10px',
            marginRight: '10px',
        },
    }));
    
    const [person, setPerson] = useState(props.person)
    
    const classes = useStyles();
        useEffect(() => {
            setPerson(props.person)
        },
        [ props ]
    )
    const handleChange = (event) => {
        const {name, value} = event.target
        setPerson({...person, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.updatePerson(person.id,person.name,person.email, person)
    }

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
        <div>
            <TextField type='text' name='name' value={person.name} onChange={handleChange} label="Username" variant="outlined" required />
        </div>
        <div>
            <TextField type='email' name='email' value={person.email} onChange={handleChange} label="Email" variant="outlined" required />
        </div>
        <div>
            <Button type='submit' variant='contained' size='large' color='primary' className={classes.btn} startIcon={<UpdateOutlinedIcon />}>
            <Typography variant='button'>
                Update
            </Typography>
            </Button>
            <Button type='submit' variant='contained' size='large' color='primary' className={classes.btn} onClick={() => props.setEditing(false)} startIcon={<CancelOutlinedIcon />}>
            <Typography variant='button'>
                Cancel
            </Typography>
            </Button>
        </div>
        </form>
    )
}