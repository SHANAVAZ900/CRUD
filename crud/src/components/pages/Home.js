import  React,{useState,useEffect} from 'react';
import axios from "axios";
import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';
import "./Home.css"
import { CardActionArea, CardContent, Typography,CardActions } from '@material-ui/core';

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



    return (
        <div className="home py-4">
            {users.map((user,index) => (
            <Card>
                <CardActionArea>
                
                    <CardContent>
                    
                        <Typography gutterBottom variant="h5" component="h2">{index+1}</Typography>
                        <Typography variant="body2" color="textSecondary" >{user.name}</Typography>
                        <Typography variant="body2" color="textSecondary" >{user.username}</Typography>
                        <Typography variant="body2" color="textSecondary" >{user.email}</Typography>
                        <Typography variant="body2" color="textSecondary" >{user.phone}</Typography>
                        <Typography variant="body2" color="textSecondary" >{user.website}</Typography>

                        <CardActions>
                            <Button variant="contained" href={`/users/${user.id}`} >View</Button>
                            <Button variant="contained" color="primary" href={`/users/edit/${user.id}`}>Edit</Button>
                            <Button variant="contained" color="secondary" onClick={() => deleteUser(user.id)} >Delete</Button>

                        </CardActions>
                        



                     
                            

                        
                        

                    </CardContent>
                      
                         
                </CardActionArea>

            </Card>
           ))}
            
        </div>
    )
}

export default Home







