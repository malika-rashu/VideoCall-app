import React, {useContext} from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { makeStyles,Typography, Tooltip,Button, TextField} from '@material-ui/core'
import { Send,Link, Chat, Cancel} from '@material-ui/icons';
import { SocketContext } from '../Context';
import logo from './videocall.png'
import { roomId } from '../rooms/Meeting';
import './msg.css'

//writing the styles for different components

const useStyles = makeStyles((theme)=>({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        
      },
      main:{
        overflow: "scroll",
        height: "90vh",
        display: "flex",
        width:"100%",
      },

      mainLeft:{
        flex:'0.75',
        display:'flex',
        flexDirection:'column',
        [theme.breakpoints.down('xs')]: {
            flex:'1',
            width:'100%'
          },
      },
      mainRight:{
        flex:'0.25',
        display:'flex',
        flexDirection:'column',
        backgroundColor: '#242f46',
        [theme.breakpoints.down('xs')]: {
            display:'none'
          },
      },

    header:{
        
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh",
        position: "relative",
        width: "100%",
        backgroundColor: "#1d2639",
  
    },
    logo:{
        color:"#eeeeee",
    },
    
    logoheader:{
        position:'fixed',
        align:'left',
        color:'white',
        height:'8vh',
        margin:'10px',

    },
    
    mainWindow:{
        flexGrow: "1",
        overflowY: "scroll",
        height:"100%"
    },
    videoGrp:{
        flexGrow: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#161d27",
    },
    videoGrid:{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        
    },
    
    options:{
        padding: "1rem",
        display: "flex",
        backgroundColor: "#1d2639",
        height:"50px",
    },
    optionsLeft:{
        display:"flex",
    },
    optionButtons:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        margin: "0 0.5rem",
        textAlign:"center",
    },
    optionsRight:{
        marginLeft:"auto",
    },
    msgContainer:{
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        webkitScrollbar:"None",
    },
    input:{
        color: "white",
        padding:"10px 0",
        width:"100%"
        
    },
    msgList:{
        listStyleType: "none",
        padding: "0",
    },
    PButton:{
        textAlign:"center",
    }


    
}))


const MeetingRoom = () => {

    const classes = useStyles();
    
      
      
    //importing important variables
    const {camColor,camIcon,cambuttonLabel,
            camTitle,camOnOff,muteUnmute,
            micIcon,micTitle,micColor,headerChat,
            micbuttonLabel,newMessage,setNewMessage, 
            userVideo, otherVideo,SendButton,
            messagetext,socketRef, showChat,mainRight ,mainLeft} = useContext(SocketContext)
    
            
    //handles the value change of message type box  
    const handleNewMessageChange = (event) => {

        setNewMessage(event.target.value);

    };
    
    //called everytime sendbutton is clicked
    const handleSendMessage = () => {

        sendMessage(newMessage);
        setNewMessage("");
        
    };

    
    const sendMessage = (messageBody) => {
       
        //if the message value is not empty "message" event is fired 
        if(newMessage)
            {socketRef.current.emit("message", {
            body: messageBody,
            senderId: socketRef.current.id,
            roomID:roomId,
            })}
            
        
    };
          
    return (

            <div className={classes.wrapper}>

                <div className= {classes.header}>

                    <div className={classes.logo}>
                    
                        <div className= {classes.header}>

                            {/* visible only when chat feature in opened in mobile phones*/}
                            <div  ref={headerChat} className={`header__chat`}>

                                <Button size="large" startIcon={<Cancel style={{ color: "white" }}/>}></Button>

                            </div>

                            <img className={classes.logoheader} src={logo} alt='logo'/>
                    
                            <div className={`text_header`}>

                                <Typography  variant="h3" align="center">Face-2-Face</Typography>
                            
                            </div>


                        </div>

                    </div>

                </div>  
                
                <div className={classes.main}>  

                    <div ref={mainLeft} className={classes.mainLeft}>

                        <div className={classes.videoGrp}>

                            <div className={classes.videoGrid}>

                                {/* our video */}
                                <video muted playsInline ref={userVideo} autoPlay className={classes.video} />

                                {/* other user's video */}
                                <video className={classes.video} playsInline autoPlay ref={otherVideo} />
                    
                            </div>

                        </div>

                        <div className={classes.options}>

                            <div className={classes.optionsLeft}>

                                <div className={`camera_L`}>

                                    {/* video off button */}
                                    <Tooltip title={camTitle} interactive>

                                        <Button onClick={ () => camOnOff()} startIcon={camIcon} variant="contained" color = {camColor} >Camera {cambuttonLabel}</Button>
                                    
                                    </Tooltip>
                                
                                </div>

                                <div className={`camera_P`}>

                                    {/* video off button */}
                                    <Tooltip title={camTitle} interactive>

                                        <Button className={classes.PButton} onClick={ () => camOnOff()} startIcon={camIcon} variant="contained" color = {camColor} >{cambuttonLabel}</Button>
                                    
                                    </Tooltip>
                                
                                </div>
                        
                                <div  className={'mic_L'}>
                                    
                                    {/* mute button */}
                                    <Tooltip title={micTitle} interactive>
                                        
                                        <Button onClick = { () => muteUnmute()} startIcon={micIcon} variant="contained" color = {micColor} >Mic {micbuttonLabel}</Button>
                                    
                                    </Tooltip>
                                
                                </div>

                                <div  className={'mic_P'}>
                                    
                                    {/* mute button */}
                                    <Tooltip title={micTitle} interactive>
                                        
                                        <Button className={classes.PButton} onClick = { () => muteUnmute()} startIcon={micIcon} variant="contained" color = {micColor} >{micbuttonLabel}</Button>
                                    
                                    </Tooltip>
                                
                                </div>
                                
                                <div className={`copy__link`}>
                                    
                                    {/* copy link button */}
                                    <CopyToClipboard text={window.location.href} className={classes.margin}>
                                        
                                        <Button startIcon={<Link/>} variant="contained" color = "primary" >Copy Meeting link</Button>
                                    
                                    </CopyToClipboard>

                                </div>
                                <div  className={`show_chat`}>
                                    
                                    {/* chat window button only available in mobile phones*/}
                                    
                                    <Button className={classes.PButton} ref={showChat} startIcon={<Chat/>} variant="contained" color = "primary" >Chat</Button>
                                    
                                </div>
          
                            </div>

                            <div className={classes.optionsRight}>
                
                                <div className={classes.optionButtons}>
                                    
                                    {/* Leave button goes back to login page */}
                                    <Button onClick={()=>window.location.replace("https://face-2-face-videocall.herokuapp.com")} variant="contained" color = "secondary" >Leave</Button>
                                
                                </div>
                            
                            </div>
                        
                        </div>
                    
                    </div>

                    <div ref={mainRight} className={classes.mainRight}>
                        
                        <div className={classes.mainWindow}>
                    
                            <div >

                                {/* list of messages */}
                                <ol className={classes.msgList}>
                                    
                                    {messagetext && messagetext.map((message, i) => (
                                        
                                        <li
                                            key={i}
                                                
                                            className={`message-item ${
                                            message.ownedByCurrentUser ? "my-message" : "received-message"
                                            }`}
                                        >
                                            
                                            {message.body}
                                        
                                        </li>
                                    ))}
         
                                </ol>
                            
                            </div>
                        
                        </div>
                        
                        <div className={classes.msgContainer}>
                            
                            {/* msg field */}
                            <TextField value={newMessage} onChange={handleNewMessageChange}  className={classes.input} type="text"  autoComplete="off"  placeholder="Type your message" InputProps={{
                            className: classes.input,
                            }}/>

                            <div className={classes.optionButtons}>

                                {/* send button */}  
                                <Button onClick={handleSendMessage}  ref={SendButton} variant="contained" color = "primary" endIcon={<Send/>}>Send</Button>
                                
                            </div>
                        
                        </div>
                    
                    </div>
                
                </div>
            
            </div>
    )
}

export default MeetingRoom
