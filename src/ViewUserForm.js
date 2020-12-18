import React from 'react'
import { makeStyles, TableCell, Tooltip, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


export const ViewUserForm = (props) => {
    const StyledTableCell = withStyles((theme) => ({
        head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        //width: 'fit-content'
        },
        body: {
        fontSize: 14,
        },
        }))(TableCell);

        const useStyles = makeStyles({
            root:{
                display: 'flex',
                flexWrap: 'wrap',
            
            },
            table:{
                width: '100%',
            }
        })
        const StyledTableRow = withStyles((theme) => ({
        root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
            //width: '100%'
        },
        },
        }))(TableRow);

        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(5);

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.users.length - page * rowsPerPage);

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };
        
        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
        };
        const classes = useStyles();
        return (
        <>
            <TableContainer component={Paper} className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow style={{width: '100%'}}>
                    <StyledTableCell align='left'>Username</StyledTableCell>
                    <StyledTableCell align="left">Email</StyledTableCell>
                    <StyledTableCell align="left">Actions</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody style={{width: '100%'}}>
                    {
                    props.users.length > 0 && 
                    (rowsPerPage > 0
                        ? props.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : props.users
                    ).map((user) => (
                    
                    <StyledTableRow key={user.id}>
                        <StyledTableCell component="th" scope="row">
                        {user.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">{user.email}</StyledTableCell>
                        <StyledTableCell>
                            <Tooltip title='Edit User'>
                                <IconButton type='submit' color="primary" component="span" onClick={() => props.editRow(user)}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Delete User'>
                                <IconButton type='submit' color="primary" component="span"  onClick={() => props.deleteUser(user.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </StyledTableCell>
                    </StyledTableRow>
                    
                    ))
                }
                {
                    props.users.length === 0 &&
                    <StyledTableRow>
                        <StyledTableCell colSpan={3} align='center'>
                            No Users
                        </StyledTableCell>
                    </StyledTableRow>
                }   
            </TableBody>
            <TableFooter>
            <TableRow>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                tabIndex ={-1}
                count={props.users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
                />
            </TableRow>
            </TableFooter>
            </Table>
            </TableContainer>
        </>
    )
}