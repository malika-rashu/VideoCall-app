require('dotenv').config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const path =require("path")
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});


app.use(cors());

const PORT = process.env.PORT || 5000;

//to store all the rooms that are connected at a given time
const rooms = {};

io.on("connection", socket => {
  
    
    socket.on("join room", (roomID) => {
       socket.join(roomID)
    
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
        } else {
            rooms[roomID] = [socket.id];
        }

        //find the id of the other user in the room if any
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        
        //if the other user is present "other user" event is fired which initiates createPeer function on the client
        //side
        //then "user joined" event is fired which sends the id of the user which just joined to the user which was
        //already in the meeting room

        if (otherUser) {
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id);
        
        };

        //recieves message from one client , sends it to all people in the room
        
        socket.on("message", (data) => {
            
            io.to(roomID).emit("createMessage", data);
           
        });
        
    });
    
    //payload contains the id of the initiator of the offer as well as the other person in the room 
    //and the offer info
    socket.on("offer", payload => {
        io.to(payload.target).emit("offer", payload);
        
    });

    //the reciever of the offer inititates the answer event that is sent to the other user
    socket.on("answer", payload => {
        io.to(payload.target).emit("answer", payload);
        
    });

    //ice servers like STUN or TURN servers create ice candidates which are responsible for creating 
    //peer to peer connection
    socket.on("ice-candidate", incoming => {
        io.to(incoming.target).emit("ice-candidate", incoming.candidate);
        
    });
    
});

//for hosting
//app.use(express.static(path.join(__dirname, 'build')))
//app.get('/*', (req,res)=>{
//    res.sendFile(path.join(__dirname, 'build','index.html'))
//})


server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));