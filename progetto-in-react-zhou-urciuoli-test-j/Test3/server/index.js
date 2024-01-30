//creating http server

const http = require('http').createServer();

//creating the socket object that require an argumet (the protocol i think) and we will put crossorigin to all because we want to be able to acces it from the front ened ( cross origin specify with URL can access this "server")
const io = require('socket.io')(http , {
    cors:{origin : "*"}
});
 
//cheacking if a connection as been made ()
io.on('connection',(socket) => {
    console.log(`${socket.id} is connected`)

    //cheacking if the cliet that we are listening to as emited some kind of message
    socket.on('messageWId',(message,room)=> {
    console.log(message,room);
    // we cheack the room if there is one we forward it to that if there isnt one we broadcast it to every one
    if(room === ''){
    //we echo the message that as been sent to all the conneccted parties by using io.emit
    // io.emit('message' , `${socket.id} said ${message}`);
    //if we want to send the message to everyone exept the one that send it the we use socket.broadcast
    socket.broadcast.emit('messageWId' , message ,socket.id);
    }else{
    socket.to(room).emit('messageWId' , message ,socket.id)
    }
    
})

//cheack if someone disconnected
socket.on('disconnect', () => {
    console.log(`User disconnected with ID: ${socket.id}`);
    
});

})

//telling the server to listen to 8080
http.listen(8080, () => console.log('listening'));
