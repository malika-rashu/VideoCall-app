import React ,{useEffect,useContext} from 'react'
import io from "socket.io-client"
import { SocketContext } from '../Context';
import MeetingRoom from '../components/MeetingRoom';


export let myvideoStream;
export let roomId;

const Meeting = (props) => {

    roomId  = props.match.params;
    const {userVideo,messagetext,setMessages,showChat,mainRight,mainLeft,
            socketRef,peerRef,otherUser,userStream,otherVideo,headerChat} =useContext(SocketContext)
    
  
    useEffect(() => {
        
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(stream => {

            userVideo.current.srcObject = stream;
            userStream.current = stream;
            myvideoStream = stream;
            socketRef.current = io.connect("https://face-2-face-videocall.herokuapp.com",{
                query: roomId
            });
            //socketRef.current = io.connect("http://localhost:5000",{
             //   query: roomId
            //});
           
            socketRef.current.emit("join room", props.match.params.roomID);
            
            //when a second person joins the room , it contacts the "otheruser" already in the room
            socketRef.current.on('other user', (userID) => {

                callUser(userID);
                otherUser.current = userID;
            
            });

            //the first person recieve the id of the user which joined
            socketRef.current.on("user joined", userID => {
                //otherUser is the person which was already in the room when the second person joined
                otherUser.current = userID;
            });

            socketRef.current.on("createMessage", (message) => {
               
                const incomingMessage = {
                  ...message,
                  ownedByCurrentUser: message.senderId === socketRef.current.id,
                  
                };
                setMessages((messagetext) => [...messagetext, incomingMessage]);
                
            });

            socketRef.current.on("offer", handleRecieveCall);

            socketRef.current.on("answer", handleAnswer);

            socketRef.current.on("ice-candidate", handleNewICECandidateMsg);
              
            showChat.current.addEventListener("click", () => {

                mainRight.current.style.display = "flex";
                mainRight.current.style.flex = "1";
                mainLeft.current.style.display = "none";
                headerChat.current.style.display = "block";

              });
            
            headerChat.current.addEventListener("click", () => {

                mainLeft.current.style.display = "flex";
                mainLeft.current.style.flex = "1";
                mainRight.current.style.display = "none";
                headerChat.current.style.display = "none";

            });
        });    

        
    }, []);
    
    

    
    function callUser(userID) {
        peerRef.current = createPeer(userID);
        userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));
    }

    //STUN and TURN servers responsible for creating ice-candidates
    function createPeer(userID) {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.stunprotocol.org"
                },
                {
                    urls: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                },
            ]
        });

        peer.onicecandidate = handleICECandidateEvent;
        //when the remote peer is sending its stream
        peer.ontrack = handleTrackEvent;
        //this is where the offer is created and sent after which it is accepted
        peer.onnegotiationneeded = () => handleNegotiationEvent(userID);

        return peer;
    }

    function handleNegotiationEvent(userID) {
        //createOffer creates a promise
        //an offer is passed which the peer sets as its local description
        peerRef.current.createOffer().then(offer => {
            return peerRef.current.setLocalDescription(offer);

        }).then(() => {
            const payload = {
                //the person we are trying to send our offer to
                target: userID,
                //caller id
                caller: socketRef.current.id,
                //actual offer data
                sdp: peerRef.current.localDescription
            };
            socketRef.current.emit("offer", payload);
        }).catch(e => console.log(e));
    }


    function handleRecieveCall(incoming) {
        peerRef.current = createPeer();
        const description = new RTCSessionDescription(incoming.sdp);
        //the offer that the other user sent is stored as remote description 
        peerRef.current.setRemoteDescription(description).then(() => {

            userStream.current.getTracks().forEach(track => peerRef.current.addTrack(track, userStream.current));

        }).then(() => {
            return peerRef.current.createAnswer();
        }).then(answer => {

            //our answer is stored as localDescription and is sent back to the other user
            return peerRef.current.setLocalDescription(answer);

        }).then(() => {
            const payload = {
                target: incoming.caller,
                caller: socketRef.current.id,
                sdp: peerRef.current.localDescription
            }
            socketRef.current.emit("answer", payload);
        })
    }
    

    function handleAnswer(message) {
        //this completes the handshake cycle
        const desc = new RTCSessionDescription(message.sdp);
        peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
    }

    function handleICECandidateEvent(e) {
        if (e.candidate) {
            const payload = {
                target: otherUser.current,
                candidate: e.candidate,
            }
            socketRef.current.emit("ice-candidate", payload);
        }
    }

    function handleNewICECandidateMsg(incoming) {
        const candidate = new RTCIceCandidate(incoming);

        peerRef.current.addIceCandidate(candidate)
            .catch(e => console.log(e));
    }

    function handleTrackEvent(e) {
        otherVideo.current.srcObject = e.streams[0];
    };

    return (
        <MeetingRoom/>   
    )
}

export default Meeting
