import React, { createContext, useState,useRef} from 'react';
import { Mic, MicOff, Videocam, VideocamOff} from '@material-ui/icons';
import { myvideoStream } from './rooms/Meeting';


const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  
    //for easy importing, declared the variables inside context.js
    const userVideo = useRef();
    const otherVideo = useRef();
    const socketRef = useRef();
    const otherUser = useRef();
    const userStream = useRef();
    const peerRef = useRef();
    const SendButton =useRef();
    const showChat =useRef();
    const mainRight = useRef();
    const mainLeft = useRef();
    const headerChat = useRef();

    const [newMessage, setNewMessage] = useState("");
    const [messagetext, setMessages] = useState([]);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCamOn, setIsCamOn] = useState(true);

    //called when mute button is clicked 
    const muteUnmute = () => {
        
      const enabled = myvideoStream.getAudioTracks()[0].enabled;
        
        if (enabled) {
          myvideoStream.getAudioTracks()[0].enabled = false;
          setIsMicOn(!isMicOn);

        } else {
          setIsMicOn(!isMicOn);
          myvideoStream.getAudioTracks()[0].enabled = true;
        }
      }
      
      
    //setting the variables for when mic is on or off 
    if (isMicOn) {
      var micTitle = "Turn off your mic";
      var micbuttonLabel = "On";
      var micIcon = <Mic/>;
      var micColor='inherit';
        
    } else {

      micColor = 'secondary';
      micTitle = "Turn on your mic";
      micIcon = <MicOff/>;
      micbuttonLabel = "Off";
    }
    
    
    //called when video off button is clicked
    const camOnOff = () => {

      const enabled = myvideoStream.getVideoTracks()[0].enabled;
        
      if (enabled) {
          myvideoStream.getVideoTracks()[0].enabled = false;
          setIsCamOn(!isCamOn);
      } else{
          setIsCamOn(!isCamOn);
          myvideoStream.getVideoTracks()[0].enabled = true;
  
        }
    }
      
    //seeting the variables for when camera is on or off
    if (isCamOn) {
      var camColor='inherit';
      var camTitle = "Turn off your camera";
      var camIcon = <Videocam/>;
      var cambuttonLabel = "On";
    } else {
      camColor = 'secondary';
      camTitle = "Turn on your camera";
      camIcon = <VideocamOff/>;
      cambuttonLabel = "Off";
    }
  
    
  return (
    <SocketContext.Provider value={{
    mainRight,
    mainLeft,
    userVideo,
    socketRef ,
    camColor,
    camIcon,
    cambuttonLabel,
    camTitle,
    headerChat,
    micIcon,
    micTitle,
    micColor,
    micbuttonLabel,
    isMicOn,
    setIsCamOn,
    setIsMicOn,
    isCamOn,
    camOnOff,
    muteUnmute,
    userStream,
    otherVideo,
    showChat,
    peerRef,
    otherUser,
    SendButton,
    messagetext,
    setMessages,
    newMessage,
    setNewMessage
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext};

    