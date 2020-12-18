import React, {useState, useEffect} from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Box, CssBaseline, Snackbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {AddUserForm} from './AddUserForm'
import {DefaultAppBar} from './DefaultAppBar'
import {ViewUserForm} from './ViewUserForm'
import {EditUserForm} from './EditUserForm'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = () => {
  
  const [darkMode, setDarkMode] = useState (true);
  const theme1 = createMuiTheme ({
    palette:{
        type: darkMode ? "dark" : "light",
        primary: {
          main: '#90caf9',
        },
    },
    typography: {
      "lineHeight": 1.5,
      "letterSpacing": 0.32,
      useNextVariants: true,
      suppressDeprecationWarnings: true,
      h6 : {
        "fontWeight": 600,
      },
      h5 : {
        "fontWeight": 600,
      },
    },
  });
  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  const data = [
    {id: '10176757',name: 'Rocky',email: 'rocky@gmail.com'},
    {id: '65747834',name: 'Rocky1',email: 'rocky1@gmail.com'},
    {id: '92072679',name: 'Rocky2',email: 'rocky2@gmail.com'},
    {id: '9272679',name: 'Rocky3',email: 'rocky3@gmail.com'},
  ]

  const defaultState = {
    id: '',
    name: '',
    email: '',
  }
  
  const [people, setPeople] = useState(data)
  const [person, setPerson] = useState(defaultState)
  const [editing, setEditing] = useState(false)
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState('')
  const [actionType, setActionType] = useState('')

  const addUser = (person) => {
    person.id = new Date().getTime().toString()
    setPeople([...people, person])
    setPerson(defaultState)
    setOpen(true)
    setContent(`Added Successfully`)
    setActionType('success')
  }

  const deleteUser = (id) => {
    setEditing(false)
    const p = people.find((person) => person.id === id)
    setPeople(people.filter(person => person.id !== id))
    setOpen(true)
    setContent(`${p.name} has been deleted`)
    setActionType('success')
  }
  const editRow = (person) => {
    setEditing(true)
    setPerson({id: person.id, name: person.name, email: person.email})
    
  }
  const updatePerson = (id,name,email, updatedPerson) => {
    setEditing(false)
    const p = people.find((person) => person.id === id)
    setPeople(people.map(person => (person.id === id) ? updatedPerson : person))
    setOpen(true)
    if(p.name === name && p.email === email)
    {
      setContent(`No changes Detected`)
      setActionType('warning')
    }
    else{
      setContent(`Information has been Updated`)
      setActionType('success')
    }
    
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
    <ThemeProvider theme={theme1}>
      <CssBaseline />
      
      <DefaultAppBar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>

      <Box display="flex" p={1} m={1} style={{flexWrap: 'wrap'}}>
        <Box p={1} m={3} flexGrow={1} bgcolor="background.paper" style={{height: 'fit-content', width: '30rem'}}>
          {
            editing ? (
              <>
                <Typography variant='h5' style={{ marginBottom: '1.5rem'}}>
                  Edit User
                </Typography>
                <EditUserForm 
                  editing= {editing} 
                  setEditing={setEditing} 
                  person = {person}
                  updatePerson = {updatePerson}
                  />
              </>
            )
            :
            (
              <>
                <Typography variant='h5' style={{ marginBottom: '1.5rem'}}>
                  Add User
                </Typography>
                <AddUserForm addUser = {addUser} />
              </>
            )
          }
          
          
        </Box>
        <Box p={1} m={3} flexGrow={1} bgcolor="background.paper" style={{height: 'fit-content', width: '30rem'}}>
          <Typography variant='h5' style={{ marginBottom: '1.5rem'}}>
            View User
          </Typography>
          <ViewUserForm 
            users = {people} 
            deleteUser = {deleteUser} 
            editRow = {editRow}
          />
        </Box>
      </Box> 
      {
        open &&
        (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={actionType}>
              {content}
            </Alert>
          </Snackbar>
        )
      }
    </ThemeProvider>
    </>
  );
}

export default App;
