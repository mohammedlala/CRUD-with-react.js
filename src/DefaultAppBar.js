import React from 'react'
import {Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';

export const DefaultAppBar = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        appbar: {
            background: 'inherit',
            color: 'inherit',
        },
    }));

    const classes = useStyles();
    return (
    <AppBar position="static" className={classes.appbar}>
        <Toolbar variant='regular'>
        <Typography variant='h5' className={classes.title}>
            CRUD Application
        </Typography>
        <Tooltip title='Toggle light/dark theme'>
        {
            props.darkMode ? 
            (<Brightness7Icon onClick={props.toggleDarkMode} />)
            :
            (<Brightness4Icon onClick={props.toggleDarkMode} />)
        }
        </Tooltip>
        </Toolbar>
    </AppBar>
    )
}