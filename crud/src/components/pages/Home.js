import  React,{useState,useEffect} from 'react';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import "./Home.css"

function Home() {
    const [users,setUser]=useState([]);

    useEffect(() =>{
        LoadUsers();
    },[]);

    const LoadUsers = async() =>{
        const result =await axios.get("http://localhost:3003/users");
        setUser(result.data.reverse());
    }

    const deleteUser = async id => {
        await axios.delete(`http://localhost:3003/users/${id}`);
        LoadUsers();
      };


    const useStyles = makeStyles({
        table: {
          minWidth: 550,
        },
      });
    
      


    const classes = useStyles();


    return (
        <div className="home py-4">
            <h1>Homepage</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead >
                        <TableRow >
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Name of the User</TableCell>
                            <TableCell align="center">UserName</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Website</TableCell>

                            <TableCell align="center" >Action</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user,index) => (
                        <TableRow>
                            <TableCell  scope="row">{index+1}</TableCell>
                            <TableCell align="center">{user.name}</TableCell> 
                            <TableCell align="center">{user.username} </TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">{user.phone}</TableCell>
                            <TableCell align="center">{user.website}</TableCell>
                            <TableCell className="actions"align="center">
                                <Button variant="contained" href={`/users/${user.id}`} >View</Button>
                                <Button variant="contained" color="primary" href={`/users/edit/${user.id}`}>Edit</Button>
                                <Button variant="contained" color="secondary" onClick={() => deleteUser(user.id)} >Delete</Button>
                                
                                
                            </TableCell>

                        </TableRow>
                        ))}
                    </TableBody>
            </Table>
        </TableContainer>
            
        </div>
    )
}

export default Home







