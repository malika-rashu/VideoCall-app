import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography} from '@material-ui/core';

const useStyles = makeStyles((theme)=>({

    root:{
        width:'100%',
        position:'static',
        height:'100px',
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            height: '60%',
        },
       
    },
    
    header1:{
        width:'33%',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            width:"18%"
          },
    },

    Textheader:{
        color:'white',
        padding:'10px',
        margin:'10px',
        fontFamily:'Roboto',
    },

    logoheader:{
        position:'fixed',
        align:'left',
        color:'white',
        height:'80px',
        padding:'10px',
        margin:'10px',
        [theme.breakpoints.down('xs')]: {
            height:'60px',
          },

    }
    
}))

const Header = () => {

    const classes = useStyles();

    return (

        <div className ={classes.root}>

            <div className={classes.header1}>

                <img className={classes.logoheader} src='./videocall.png' alt='logo'></img>
            
            </div>
            
            <div>
            
                <Typography className={classes.Textheader} variant="h2" align="center">Face-2-Face Call</Typography>
            
            </div>
            
            
        </div>
    )
}

export default Header
