import React from 'react'
import { Button, Grid, Container, Paper ,makeStyles} from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { VideoCall,Link} from '@material-ui/icons';
import { v4 as uuidV4 } from 'uuid'
import Header from '../components/Header';



//styles
const useStyles = makeStyles((theme) => ({

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },

  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  
  container: {
    width: '35%',
    margin: '35px',
    padding: "10px",
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      padding: "5px",
      
    },
  },
  
  Button: {
    margin:'10px',
    padding:'10px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      objectFit:'contain',
      margin:'5px 0 5px 0',
    },
},

gridContainer: {
  width: '100%',
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
    width:'100%',
    
  },
  
},

paper: {
  padding: '10px 20px 10px 20px',
  border: '2px solid black',
  
},


}
));

const Login = (props)=> {

  //opens a random meeting room 
  function createroom () {
    const id = uuidV4();
    props.history.push(`/${id}`);
  }

  //creates a random meeting link that can be copied
  function uuid(){
    var link = window.location.href  +uuidV4();
    return link;
  }
  
  const classes = useStyles();
  
  return (
    <div className={classes.wrapper}>
      
      <Header/>
      
        <Container className={classes.container}>
      
          <Paper elevation={10} className={classes.paper}>
            
            <Grid container className={classes.gridContainer}>
            
              <Button size ='large' className={classes.Button} onClick={createroom} startIcon={<VideoCall/>}  variant="contained" color="primary" fullWidth >
                  join instant meeting
              </Button>
                
              <CopyToClipboard text={uuid()}>
                
                <Button size ='large' className={classes.Button}  startIcon={<Link/>}  variant="contained" color="primary" fullWidth >
                  get a meeting link
                </Button>
              
              </CopyToClipboard>
            
            </Grid>
   
          </Paper>
        
        </Container>
    </div>
  )
}
export default Login